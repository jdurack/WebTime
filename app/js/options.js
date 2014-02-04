(function() {
  var addWatchURLToForm, watchURL, watchURLs, _i, _len;

  watchURLs = WebTime.utils.getWatchURLs();

  console.log('watchURLs...', watchURLs);

  for (_i = 0, _len = watchURLs.length; _i < _len; _i++) {
    watchURL = watchURLs[_i];
    addWatchURLToForm(watchURL);
  }

  addWatchURLToForm = function(watchURL) {};

}).call(this);
