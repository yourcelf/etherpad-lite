var config = module.exports;

// How many tests should run parallel?
config.parallel= 1;

// Loglevels: DEBUG, INFO, ERROR
config.loglevel = "DEBUG";

// The url of the Etherpad Lite instance
config.url = "http://beta.etherpad.org";

// Webdriver settings
config.wd = {};
config.wd.host = "ondemand.saucelabs.com";
config.wd.port = 80;
config.wd.username= "YOURUSERNAME";
config.wd.accessKey ="YOURACCESSKEY";

// Enviroments
config.enviroments = []

// See http://www.w3counter.com/globalstats.php

// Firefox 
config.enviroments.push({
    'platform'       : 'Linux'
  , 'browserName'    : 'firefox'
  , 'version'        : ''
});

// Chrome
config.enviroments.push({
    'platform'       : 'Linux'
  , 'browserName'    : 'googlechrome'
  , 'version'        : ''
});

// Opera
config.enviroments.push({
    'platform'       : 'Linux'
  , 'browserName'    : 'opera'
  , 'version'        : ''
});

// IE 7
config.enviroments.push({
    'platform'       : 'Windows 2003'
  , 'browserName'    : 'iexplore'
  , 'version'        : '7'
});

// IE 8
config.enviroments.push({
    'platform'       : 'Windows 2003'
  , 'browserName'    : 'iexplore'
  , 'version'        : '8'
});

// IE 9
config.enviroments.push({
    'platform'       : 'Windows 2008'
  , 'browserName'    : 'iexplore'
  , 'version'        : '9'
});
