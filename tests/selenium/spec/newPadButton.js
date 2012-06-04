exports.name = "I can haz new Pad?";

exports.func= function(options, callback){
  var browser = options.browser;
  var assert = options.assert;

  browser.chain
  .session()
  .open('/')
  .waitForPageToLoad(3000)
  .click('id=button')
  .getLocation(function(location){
    assert.equal(location.indexOf("/p/") !== -1, true, "Clicking on 'New Pad' doesn't work");
  })
}