// tests the settings buttons functionality

exports.name = "Do the settings buttons/options work?";

exports.func= function(options, callback){
  var browser = options.browser;
  var assert = options.assert;
  var location;

  browser.chain
  .session()
  .setTimeout(20000)

  // test Chat always on screen
  .open('/p/'+ options.padID)
  .waitForElementPresent('id=innerdocbody')
  .verifyNotVisible('id=chatbox')
  .click('id=options-stickychat')
  .verifyVisible('id=chatbox')

  // test Show authorship colors
//  .open('/p/'+ options.padID)
//  .waitForElementPresent('id=innerdocbody')
//  .verifyNotVisible('id=chatbox')
//  .click('id=options-colorscheck')
//  .verifyVisible('id=chatbox')
// Not possible yet, needs writing

  // test Show line numbers
  .open('/p/'+ options.padID)
  .waitForElementPresent('id=innerdocbody')
  .verifyVisible('id=sidediv')
  .click('id=options-linenoscheck')
  .verifyNotVisible('id=sidediv')

// test change to monospace.
// not possible yet, needs writing

}
