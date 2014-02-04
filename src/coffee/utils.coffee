WebTime.utils =
  getWatchURLs: () ->
    watchURLsJSON = localStorage.getItem WebTime.config.localStorageKeys.watchURLs
    watchURLs = []
    if watchURLsJSON
      watchURLs = JSON.parse watchURLsJSON
    else
      WebTime.utils.setWatchURLs watchURLs
    watchURLs

  setWatchURLs: (watchURLs) ->
    localStorage.setItem WebTime.config.localStorageKeys.watchURLs, JSON.stringify watchURLs

  getTemplate: (templateName) ->
    templates = window.WebTime.Template
    fullTemplateName = 'src/html/template/' + templateName + '.html'
    template = templates[ fullTemplateName ]
    template

  getMaxSecondsPerDay: () ->
    maxSecondsPerDayString = localStorage.getItem WebTime.config.localStorageKeys.maxSecondsPerDay
    if maxSecondsPerDayString
      maxSecondsPerDay = parseInt maxSecondsPerDayString
    else
      maxSecondsPerDay = WebTime.config.defaultMaxSecondsPerDay
      WebTime.utils.setMaxSecondsPerDay maxSecondsPerDay

    maxSecondsPerDay

  setMaxSecondsPerDay: (maxSecondsPerDay) ->
    localStorage.setItem WebTime.config.localStorageKeys.maxSecondsPerDay, maxSecondsPerDay