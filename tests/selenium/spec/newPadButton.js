exports.name = "I can haz new Pad?";

exports.func= function(options, callback){
  var browser = options.browser;
  var assert = options.assert;

  browser
  .get(options.config.url + "/")
  .elementById('button', function(err, button){
    browser.clickElement(button)
    .url(function(err, location){
      assert.equal(location.indexOf("/p/") !== -1, true, "Clicking on 'New Pad' doesn't work");
      callback();
    });
  });
}