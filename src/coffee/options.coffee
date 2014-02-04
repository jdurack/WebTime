init = () ->
  resetForm()

addWatchURLsToForm = () ->
  watchURLs = WebTime.utils.getWatchURLs()

  #add blank one to start...
  addWatchURLToForm()

  for watchURL, index in watchURLs
    addWatchURLToForm index, watchURL

addWatchURLToForm = (index, watchURL, prepend) ->
  watchURLTemplate = WebTime.utils.getTemplate 'watchURL'
  watchURLHTML = watchURLTemplate
    index: index
    url: watchURL

  if prepend
    $('#watchURL-new').after watchURLHTML
  else
    $('#watchURLs').append watchURLHTML
  
addEvents = () ->
  $('#maxMinutesPerDay').on 'change', maxMinutesPerDayChangeEvent
  $('.removeWatchURL').on 'click', removeWatchURLClickEvent
  $('#newWatchURL').on 'blur', newWatchURLEvent
  $('#optionsForm').on 'submit', formSubmitEvent

removeEvents = () ->
  $('#maxMinutesPerDay').off 'change', maxMinutesPerDayChangeEvent
  $('.removeWatchURL').off 'click', removeWatchURLClickEvent
  $('#newWatchURL').off 'blur', newWatchURLEvent
  $('#optionsForm').off 'submit', formSubmitEvent

resetEvents = () ->
  removeEvents()
  addEvents()

maxMinutesPerDayChangeEvent = (event) ->
  element = getMaxMinutesPerDayElement()
  newMaxMinutesPerDay = element.value
  newMaxSecondsPerDay = newMaxMinutesPerDay * 60
  WebTime.utils.setMaxSecondsPerDay newMaxSecondsPerDay

removeWatchURLClickEvent = (event) ->
  indicator = 'removeWatchURL-'
  index = event.currentTarget.id.substr indicator.length
  removeWatchURL index

newWatchURLEvent = (event) ->
  checkAndAddNewWatchURL()

formSubmitEvent = (event) ->
  event.preventDefault()
  checkAndAddNewWatchURL()
  return false

getNewWatchURLElement = () ->
  element = $('#newWatchURL')[0]
  element

getMaxMinutesPerDayElement = () ->
  element = $('#maxMinutesPerDay')[0]
  element

checkAndAddNewWatchURL = () ->
  watchURL = getNewWatchURLElement().value

  unless watchURL
    return
  
  watchURL = watchURL.toLowerCase()
  watchURLs = WebTime.utils.getWatchURLs()
  existingIndex = watchURLs.indexOf watchURL
  if existingIndex isnt -1
    return

  watchURLs.unshift watchURL
  WebTime.utils.setWatchURLs watchURLs
  resetForm()

resetForm = () ->
  $('.watchURL').remove()
  addWatchURLsToForm()
  setMaxMinutesPerDayValue()
  getNewWatchURLElement().focus()
  resetEvents()

setMaxMinutesPerDayValue = () ->
  maxSecondsPerDay = WebTime.utils.getMaxSecondsPerDay()
  maxMinutesPerDay = Math.floor ( maxSecondsPerDay / 60 )
  getMaxMinutesPerDayElement().value = maxMinutesPerDay

removeWatchURL = (index) ->
  unless index >= 0 then return

  watchURLs = WebTime.utils.getWatchURLs()
  unless watchURLs and watchURLs.length > index then return

  watchURLs.splice index, 1
  WebTime.utils.setWatchURLs watchURLs
  $('#watchURL-' + index).remove()
  resetForm()

$(document).ready init