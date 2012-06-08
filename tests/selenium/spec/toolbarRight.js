exports.name = "Does the Settings, Share, Embed ETC work  when clicked and are the contents correct?";

exports.func= function(options, callback){
  var browser = options.browser;
  var assert = options.assert;
  var location;

  browser.chain
  .session()
  .setTimeout(20000)
  .open('/p/'+ options.padID)
  .waitForNotVisible('id=editorloadingbox')

  // Share and Embed
  .click('id=embedlink')
  .assertVisible('id=embed')

  .getLocation(function(_location){
    location = _location;
  })

  .getValue('id=linkinput', function(linkField){
    assert.equal(location, linkField, "Embed/Share element is not visible");
  })
  
  .getValue('id=embedinput', function(iFrameValue){
    assert.equal(iFrameValue.indexOf(location) !== -1, true, "Iframe link does not contain URL");
    assert.equal(iFrameValue.indexOf('iframe') !== -1, true, "Iframe link does not contain iframe");
  })

  .click('id=readonlyinput')

  .getValue('id=linkinput', function(linkField){
    assert.equal(linkField.indexOf('r.') !== -1, true, "Read Only link does not contain r.");
  })

  .getValue('id=embedinput', function(iFrameValue){
    assert.equal(iFrameValue.indexOf('iframe') !== -1, true, "Read Only Iframe link does not contain iframe");
    assert.equal(iFrameValue.indexOf('r.') !== -1, true, "Read Only Iframe link does not contain read only style url");
  })


  // Settings
  .open('/p/'+ options.padID)
  .waitForElementPresent('id=innerdocbody')
  .verifyNotVisible('id=settings')
  .click('id=settingslink')
  .verifyVisible('id=settings')

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

  // User drop down
  .open('/p/'+ options.padID)
  .waitForElementPresent('id=innerdocbody')
  .verifyNotVisible('id=users')
  .click('id=usericon')
  .verifyVisible('id=users')


}
