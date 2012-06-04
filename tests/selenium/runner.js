var specFolder = "./spec";
var srcFolder = "../../src";
var config = require("./config");
var async = require(srcFolder + "/node_modules/async");
var soda = require(srcFolder + "/node_modules/soda");
var _ = require(srcFolder + "/node_modules/underscore");
var randomString = require(srcFolder + "/node/utils/randomstring");
var fs = require("fs");
var log4js = require(srcFolder + "/node_modules/log4js");
var assert = require("assert");

//load all tests
var specNames = fs.readdirSync(specFolder);
var specFuncs = specNames.map(function(name){
  return require(specFolder + "/" + name);
});

var testWorker = async.queue(function (test, callback) {
  //set up browser
  var browserSettings = _.extend(config.base, test.env);
  var browser = soda.createSauceClient(browserSettings);

  //build logger for this test
  var name = "'" + test.spec.name + "' on " + test.env.browser + " " + test.env["browser-version"] + ", " + test.env.os;
  var logger = log4js.getLogger(name);

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

//load all test and enviroment combinations in the worker queue
specFuncs.forEach(function(spec){
  config.enviroments.forEach(function(env){
    testWorker.push({spec: spec, env: env});
  });
})
