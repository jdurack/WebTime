WebTime.utils =
  getWatchURLs: () ->
    watchURLs = localStorage.getItem WebTime.config.localStorageKeys.watchURLs
    unless watchURLs
      watchURLs = []
    watchURLs

  setWatchURLs: (watchURLs) ->
    localStorage.setItem WebTime.config.localStorageKeys.watchURLs, watchURLs