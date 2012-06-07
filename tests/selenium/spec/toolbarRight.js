exports.name = "Does the Share Dropdown Show when clicked and are the contents correct?";

exports.func= function(options, callback){
  var browser = options.browser;
  var assert = options.assert;
  var location;

  browser.chain
  .session()
  .setTimeout(20000)
  .open('/p/'+ options.padID)
  .waitForNotVisible('id=editorloadingbox')
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
}
