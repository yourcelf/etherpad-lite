// tests the parameters documented here: https://github.com/Pita/etherpad-lite/wiki/Embed-Parameters

exports.name = "Does passing a URL parameter work?";

exports.func= function(options, callback){
  var browser = options.browser;
  var assert = options.assert;
  var baseURL = options.config.url + "/p/" + options.padID;

  browser
  //load pad without parameter
  .get(baseURL)
  .waitForElement("css selector", "#editorcontainer iframe", 10000)
  
  //check if editbar and chat is visible if no parameters are passed
  .isVisible("id", "editbar", function(err, visible){
    assert.equal(visible, true, "Editbar is not visable in normal view");
  })
  .isVisible("id", "chaticon", function(err, visible){
    assert.equal(visible, true, "Chat is not visable in normal view");
  })

  //load pad with showControls = false
  .get(baseURL + "?showControls=false")
  .waitForElement("css selector", "#editorcontainer iframe", 10000)

  .isVisible("id", "editbar", function(err, visible){
    assert.equal(visible, false, "Editbar is still visable with ?showControls=false");
  })

  //load pad with showChat = false
  .get(baseURL + "?showChat=false")
  .waitForElement("css selector", "#editorcontainer iframe", 10000)

  .isVisible("id", "chaticon", function(err, visible){
    assert.equal(visible, false, "Chat is still visable with ?showChat=false");
  })

  callback();


  // test hiding the toolbar
  /*.open('/p/'+ options.padID)
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
//  .verifyAttribute('css=#sidediv', 'sidedivhidden') // this is broken.*/

}
