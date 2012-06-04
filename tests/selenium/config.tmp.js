var config = module.exports;

// How many tests should run parallel?
config.parallel= 10;

// Loglevels: DEBUG, INFO, ERROR
config.loglevel = "INFO";

// Base settings for every test
config.base = {};
config.base.url = "http://beta.etherpad.org";
config.base.username= "YOURUSERNAME";
config.base["access-key"]="YOURACCESSKEY";

// Enviroments
config.enviroments = []

// See http://www.w3counter.com/globalstats.php

// Firefox 
config.enviroments.push({
    'os'             : 'Windows 2003'
  , 'browser'        : 'firefox'
  , 'browser-version': ''
});

// Chrome
config.enviroments.push({
    'os'             : 'Windows 2003'
  , 'browser'        : 'googlechrome'
  , 'browser-version': ''
});

// Safari
config.enviroments.push({
    'os'             : 'Windows 2003'
  , 'browser'        : 'safari'
  , 'browser-version': ''
});

// Opera
config.enviroments.push({
    'os'             : 'Windows 2003'
  , 'browser'        : 'opera'
  , 'browser-version': ''
});

// IE 7
config.enviroments.push({
    'os'             : 'Windows 2003'
  , 'browser'        : 'iexplore'
  , 'browser-version': '7'
});

// IE 8
config.enviroments.push({
    'os'             : 'Windows 2003'
  , 'browser'        : 'iexplore'
  , 'browser-version': '8'
});

// IE 9
config.enviroments.push({
    'os'             : 'Windows 2008'
  , 'browser'        : 'iexplore'
  , 'browser-version': '9'
});
