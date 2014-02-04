(function() {
  WebTime.utils = {
    getWatchURLs: function() {
      var watchURLs;
      watchURLs = localStorage.getItem(WebTime.config.localStorageKeys.watchURLs);
      if (!watchURLs) {
        watchURLs = [];
      }
      return watchURLs;
    },
    setWatchURLs: function(watchURLs) {
      return localStorage.setItem(WebTime.config.localStorageKeys.watchURLs, watchURLs);
    }
  };

}).call(this);
