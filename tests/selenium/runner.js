var specFolder = "./spec";
var srcFolder = "../../src";
var config = require("./config");
var async = require(srcFolder + "/node_modules/async");
var wd = require(srcFolder + "/node_modules/wd");
var _ = require(srcFolder + "/node_modules/underscore");
var randomString = require(srcFolder + "/node/utils/randomstring");
var fs = require("fs");
var assert = require("assert");
var optimist = require(srcFolder + "/node_modules/optimist");
var argv = optimist.argv;
var log4js = require(srcFolder + "/node_modules/log4js");
log4js.restoreConsole();

//generate help
optimist.describe("browser", "a comma seperated list of browsers to test in");
optimist.describe("spec", "a comma seperated list of specs to test");

//show help if requested
if(argv.help){
  optimist.showHelp();
}

//wrap all assert functions and catch the ecxeptions
var createSafeAssert = function(logger){
  var safeAssert = {};

  for(var key in assert){
    safeAssert[key] = _.wrap(assert[key], function(func){
      try{
        func.apply(null, Array.prototype.slice.apply(arguments, [1]));
      } catch(e){
        logger.error(e);
      }
    });
  }

  return safeAssert;
}

var testWorker = async.queue(function (test, callback) {
  //set up browser
  var browser = wd.remote(config.wd.host, config.wd.port, config.wd.username, config.wd.accessKey);

  //build name of the test
  var name = "'" + test.spec.name + "' on " + test.env.browserName + " " + test.env.version;

  //setup logging
  var logger = log4js.getLogger(name);
  logger.setLevel(config.loglevel);
  browser.on('command', _.bind(logger.debug,logger));

   //create a random padname for this test
  var padID = "SELENIUM_" + randomString(20);

  //build the test settings
  var testSettings = _.clone(test.env);
  testSettings.name = name;

  var assert = createSafeAssert(logger);

  //callback for the test
  var cb = function(){
    logger.info("Finished. See the video https://saucelabs.com/jobs/" + browser.sessionID);

    //quit the browser
    browser.quit();

    //finish this task
    callback();
  }

  logger.info("started");

  browser.init(testSettings, function(){
    //run the test
    test.spec.func({ logger: logger
                   , browser: browser 
                   , padID: padID 
                   , assert: assert
                   , config: config
                   , async: async
                   }, cb); 
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
  //allow common browser shortcuts
  argv.browser = argv.browser.replace("ie","iexplore").replace("chrome","googlechrome").replace("ff","firefox");
  
  var allowedBrowsers = argv.browser.split(",");

  tests = tests.filter(function(test){
    return allowedBrowsers.indexOf(test.env.browserName) !== -1;
  });
}

//filter out only allowed specs
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