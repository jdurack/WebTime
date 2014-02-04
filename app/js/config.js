(function() {
  WebTime.config = {
    timeIntervalSeconds: 1,
    localStorageKeys: {
      elapsedTimeSecondsBase: 'WebTime.elapsedTimeSeconds',
      watchURLs: 'WebTime.watchURLs',
      maxSecondsPerDay: 'WebTime.maxSecondsPerDay'
    },
    defaultMaxSecondsPerDay: 60 * 30,
    iconWidthAndHeight: 19,
    gradientWidth: 100,
    gradientStartColor: 'DarkGreen',
    gradientOneThirdColor: 'GoldenRod',
    gradientTwoThirdsColor: 'DarkOrange',
    gradientStopColor: 'DarkRed',
    badgeColor: 'DarkRed'
  };

}).call(this);
