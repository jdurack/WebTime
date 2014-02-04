(function() {
  WebTime.config = {
    timeInterval: 1000,
    localStorageKeys: {
      elapsedTimeBase: 'WebTime.elapsedTime-',
      watchURLs: 'WebTime.watchURLs'
    },
    maxTimePerDay: 1000 * 60 * 45,
    iconWidthAndHeight: 19,
    gradientWidth: 100,
    gradientStartColor: 'DarkGreen',
    gradientOneThirdColor: 'GoldenRod',
    gradientTwoThirdsColor: 'DarkOrange',
    gradientStopColor: 'DarkRed',
    badgeColor: 'DarkRed',
    defaultWatchURLs: ['cnn.com', 'droid-life.com', 'engadget.com', 'movieswithbutter.com', 'techcrunch.com', 'traileraddict.com', 'wired.com', 'woot.com']
  };

}).call(this);
