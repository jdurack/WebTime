activeTab = null
clockInterval = null
iconCanvas = null
gradientCanvas = null
gradientCanvasContext = null

run = () ->
  checkFirstRun()
  chrome.tabs.onUpdated.addListener getAndCheckCurrentTab
  chrome.tabs.onActivated.addListener getAndCheckCurrentTab
  chrome.windows.onFocusChanged.addListener getAndCheckCurrentTab
  updateIcon()

checkFirstRun = () ->
  if WebTime.utils.isFirstRun()
    optionsURL = 'chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/html/options.html'
    chrome.tabs.create
      url: optionsURL

getAndCheckCurrentTab = () ->
  chrome.windows.getCurrent {}, (window) ->
    unless window
      stopClock()
      return
    chrome.tabs.query {active: true, windowId: window.id}, (tabs) ->
      unless tabs and tabs.length > 0
        stopClock()
        return
      checkTab tabs[0]

checkTab = (tab) ->
  unless tab and tab.active
    stopClock()
    return

  url = tab.url

  domain = getDomainFromURL url
  unless domain
    stopClock()
    return

  matched = false
  for watchDomain in WebTime.utils.getWatchURLs()
    foundIndex = domain.indexOf watchDomain
    if foundIndex isnt -1
      runClock watchDomain
      matched = true
      break

  if not matched
    stopClock()

runClock = () ->
  unless isClockRunning()
    timeIntervaleMilliseconds = WebTime.config.timeIntervalSeconds * 1000
    clockInterval = setInterval updateClock, timeIntervaleMilliseconds
    updateIcon()

stopClock = () ->
  if isClockRunning()
    clearInterval clockInterval
    clockInterval = null
    updateIcon()

getElapsedTimeSecondsLocalStorageKey = () ->
  currentDate = new Date()
  day = currentDate.getDate()
  month = currentDate.getMonth() + 1
  year = currentDate.getFullYear()
  localStorageKeyBase = WebTime.config.localStorageKeys.elapsedTimeSecondsBase
  localStorageKey = localStorageKeyBase + '-' + year + '-' + month + '-' + day
  localStorageKey

getElapsedTimeSeconds = () ->
  localStorageKey = getElapsedTimeSecondsLocalStorageKey()
  elapsedTimeSeconds = localStorage.getItem localStorageKey
  if not elapsedTimeSeconds
    elapsedTimeSeconds = 0
  else
    elapsedTimeSeconds = parseInt elapsedTimeSeconds
  elapsedTimeSeconds

getElapsedTimeMinutes = () ->
  elapsedTimeSeconds = getElapsedTimeSeconds()
  elapsedTimeMinutes = Math.floor ( elapsedTimeSeconds / 60 )
  elapsedTimeMinutes

setElapsedTime = (elapsedTimeSeconds) ->
  localStorageKey = getElapsedTimeSecondsLocalStorageKey()
  localStorage.setItem localStorageKey, elapsedTimeSeconds

updateClock = (elapsedTimeSeconds) ->
  elapsedTimeSeconds = getElapsedTimeSeconds()
  elapsedTimeSeconds += parseInt WebTime.config.timeIntervalSeconds
  setElapsedTime elapsedTimeSeconds
  updateIcon()

isClockRunning = () ->
  if clockInterval
    return true
  return false

updateIcon = () ->
  imageData = getIconImageData()
  chrome.browserAction.setIcon
    imageData: imageData

  if isClockRunning()
    chrome.browserAction.setBadgeBackgroundColor
      color: WebTime.config.badgeColor

    text = getElapsedTimeMinutes().toString()
    if isOverTime()
      text += '!'

    chrome.browserAction.setBadgeText
      text: text
  else
    chrome.browserAction.setBadgeText
      text: ''

isOverTime = () ->
  elapsedTimeSeconds = getElapsedTimeSeconds()
  fractionElapsed = elapsedTimeSeconds / WebTime.utils.getMaxSecondsPerDay()
  if fractionElapsed >= 1
    return true
  return false

getIconColor = () ->
  elapsedTimeSeconds = getElapsedTimeSeconds()
  fractionElapsed = elapsedTimeSeconds / WebTime.utils.getMaxSecondsPerDay()
  if fractionElapsed > 1
    fractionElapsed = 1
  gradientWidth = WebTime.config.gradientWidth
  x = Math.floor fractionElapsed * ( gradientWidth - 1 )
  data = getGradientCanvasContext().getImageData( x, 0, 1, 1 ).data
  colorString = '#'
  colorString += getColorHex data[0]
  colorString += getColorHex data[1]
  colorString += getColorHex data[2]
  colorString

getColorHex = (colorValue) ->
  hex = colorValue.toString 16
  if hex.length is 1
    hex = '0' + hex
  hex

getGradientCanvasContext = () ->
  if gradientCanvasContext
    return gradientCanvasContext
  gradientWidth = WebTime.config.gradientWidth
  gradientHeight = 1
  gradientCanvas = document.createElement 'canvas'
  gradientCanvasContext =  gradientCanvas.getContext '2d'
  gradientCanvas.width = gradientWidth
  gradientCanvas.height = gradientHeight
  
  gradient = gradientCanvasContext.createLinearGradient 0, 0, (gradientWidth - 1), ( gradientHeight - 1 )
  gradient.addColorStop 0, WebTime.config.gradientStartColor
  gradient.addColorStop (1/3), WebTime.config.gradientOneThirdColor
  gradient.addColorStop (2/3), WebTime.config.gradientTwoThirdsColor
  gradient.addColorStop 1, WebTime.config.gradientStopColor

  gradientCanvasContext.fillStyle = gradient
  gradientCanvasContext.fillRect 0, 0, gradientWidth, gradientHeight
  gradientCanvasContext

getIconImageData = () ->
  if not iconCanvas
    iconCanvas = document.createElement 'canvas'
  canvasContext = iconCanvas.getContext '2d'
  canvasWidth = WebTime.config.iconWidthAndHeight
  iconCanvas.width = iconCanvas.height = canvasWidth

  centerX = iconCanvas.width / 2
  centerY = iconCanvas.width / 2
  radius = iconCanvas.width / 2

  color = getIconColor()
  canvasContext.beginPath()
  canvasContext.arc centerX, centerY, radius, 0, 2 * Math.PI, false
  canvasContext.fillStyle = color
  canvasContext.fill()
  canvasContext.lineWidth = 1
  canvasContext.strokeStyle = color
  canvasContext.stroke()
  imageData = canvasContext.getImageData 0, 0, canvasWidth, canvasWidth

  imageData

getDomainFromURL = (url) ->
  unless url then return ''

  regex = /^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i
  matches = url.match regex
  domain = ''
  if matches and matches[1]
    domain = matches[1]
  domain


run()