var specFolder = "./spec";
var srcFolder = "../../src";
var config = require("./config");
var async = require(srcFolder + "/node_modules/async");
var soda = require(srcFolder + "/node_modules/soda");
var _ = require(srcFolder + "/node_modules/underscore");
var randomString = require(srcFolder + "/node/utils/randomstring");
var fs = require("fs");
var assert = require("assert");
var optimist = require(srcFolder + "/node_modules/optimist");
var argv = optimist.argv;

//generate help
optimist.describe("browser", "a comma seperated list of browsers to test in");
optimist.describe("spec", "a comma seperated list of specs to test");
optimist.showHelp();

var log4js = require(srcFolder + "/node_modules/log4js");

var testWorker = async.queue(function (test, callback) {
  //set up browser
  var browserSettings = _.extend(config.base, test.env);
  var browser = soda.createSauceClient(browserSettings);

  //build logger for this test
  var name = "'" + test.spec.name + "' on " + test.env.browser + " " + test.env["browser-version"] + ", " + test.env.os;
  var logger = log4js.getLogger(name);
  logger.setLevel(config.loglevel);

  //connect the logger to the browser
  browser.on('command', function(cmd, args){
    logger.debug(cmd, args.join(', '));
  });

   //create a random padname for this test
  var padID = randomString(20);

  logger.info("started");

   //run the test
  test.spec.func({ logger: logger
                 , browser: browser 
                 , padID: padID 
                 , assert: assert
                 , browserSettings: browserSettings
                 }); 
  
  //add end event handler
  browser.end(function(err){
    this.queue = null;

    var url = this.jobUrl;

    this.setContext('sauce:job-info={"passed": ' + (err === null) + '}', function(){
      browser.testComplete(function(){
        if(err){
          logger.error("failed", err.stack || err);
        } else {
          logger.info("finished successfully");
        }

        logger.info("See video ", url);

        callback();
      });
    });
  });

}, config.parallel);

var tests = [];

//load all tests
var fileNames = fs.readdirSync(specFolder);

//load all test and enviroment combinations in the tests array
fileNames.forEach(function(fileName){
  var spec = require(specFolder + "/" + fileName);

  config.enviroments.forEach(function(env){
    tests.push({spec: spec, env: env, fileName: fileName});
  });
});

//filter out only allowed browsers
if(argv.browser){
  var allowedBrowsers = argv.browser.split(",");

  tests = tests.filter(function(test){
    return allowedBrowsers.indexOf(test.env.browser) !== -1;
  });
}

//filter out only allowed browsers
if(argv.spec){
  var allowedSpecs = argv.spec.split(",");

  tests = tests.filter(function(test){
    return allowedSpecs.indexOf(test.fileName) !== -1;
  });
}

//add all workers that are still left to the workerQueue
tests.forEach(function(test){
  testWorker.push(test);
})