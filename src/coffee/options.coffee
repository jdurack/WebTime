watchURLs = WebTime.utils.getWatchURLs()
console.log 'watchURLs...', watchURLs

for watchURL in watchURLs
  addWatchURLToForm watchURL

addWatchURLToForm = (watchURL) ->
  