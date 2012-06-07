// tests the parameters documented here: https://github.com/Pita/etherpad-lite/wiki/Embed-Parameters

exports.name = "Does passing a URL parameter work?";

exports.func= function(options, callback){
  var browser = options.browser;
  var assert = options.assert;
  var location;

  browser.chain
  .session()
  .setTimeout(20000)

  // test hiding the toolbar
  .open('/p/'+ options.padID)
  .waitForElementPresent('id=innerdocbody')
  .assertVisible('id=editbar')
  .open('/p/'+ options.padID + '?showControls=false')
  .waitForElementPresent('id=innerdocbody')
  .verifyNotVisible('id=editbar')

  // test hiding chat
  .open('/p/'+ options.padID)
  .waitForElementPresent('id=innerdocbody')
  .assertVisible('id=chaticon')
  .open('/p/'+ options.padID + '?showChat=false')
  .waitForElementPresent('id=innerdocbody')
  .verifyNotVisible('id=chaticon')

  // useMonospaceFont 
  .open('/p/'+ options.padID + '?useMonospaceFont=true')
  .waitForElementPresent('id=innerdocbody')
//  .verifyAttribute('id=innerdocbody', 'monospace') // this is broken.

  // userName 
  .open('/p/'+ options.padID)
  .waitForElementPresent('id=innerdocbody')
  .assertNotValue('id=myusernameedit', 'test')
  .open('/p/'+ options.padID + '?userName=test')
  .waitForElementPresent('id=innerdocbody')
  .verifyValue('id=myusernameedit', 'test')

  // test hiding line numbers
  .open('/p/'+ options.padID)
  .waitForElementPresent('id=innerdocbody')
  .assertVisible('id=sidediv')
  .open('/p/'+ options.padID + '?showLineNumbers=false')
  .waitForElementPresent('id=innerdocbody')
//  .verifyAttribute('css=#sidediv', 'sidedivhidden') // this is broken.

}
