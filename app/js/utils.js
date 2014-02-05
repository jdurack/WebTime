(function() {
  WebTime.utils = {
    isFirstRun: function() {
      var hasRun;
      hasRun = localStorage.getItem(WebTime.config.localStorageKeys.hasRun);
      if (hasRun) {
        return false;
      }
      return true;
    },
    setHasRun: function() {
      return localStorage.setItem(WebTime.config.localStorageKeys.hasRun, true);
    },
    getWatchURLs: function() {
      var watchURLs, watchURLsJSON;
      watchURLsJSON = localStorage.getItem(WebTime.config.localStorageKeys.watchURLs);
      watchURLs = [];
      if (watchURLsJSON) {
        watchURLs = JSON.parse(watchURLsJSON);
      } else {
        WebTime.utils.setWatchURLs(watchURLs);
      }
      return watchURLs;
    },
    setWatchURLs: function(watchURLs) {
      return localStorage.setItem(WebTime.config.localStorageKeys.watchURLs, JSON.stringify(watchURLs));
    },
    getTemplate: function(templateName) {
      var fullTemplateName, template, templates;
      templates = window.WebTime.Template;
      fullTemplateName = 'src/html/template/' + templateName + '.html';
      template = templates[fullTemplateName];
      return template;
    },
    getMaxSecondsPerDay: function() {
      var maxSecondsPerDay, maxSecondsPerDayString;
      maxSecondsPerDayString = localStorage.getItem(WebTime.config.localStorageKeys.maxSecondsPerDay);
      if (maxSecondsPerDayString) {
        maxSecondsPerDay = parseInt(maxSecondsPerDayString);
      } else {
        maxSecondsPerDay = WebTime.config.defaultMaxSecondsPerDay;
        WebTime.utils.setMaxSecondsPerDay(maxSecondsPerDay);
      }
      return maxSecondsPerDay;
    },
    setMaxSecondsPerDay: function(maxSecondsPerDay) {
      return localStorage.setItem(WebTime.config.localStorageKeys.maxSecondsPerDay, maxSecondsPerDay);
    }
  };

}).call(this);
