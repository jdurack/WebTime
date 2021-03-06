(function() {
  var activeTab, checkTab, clockInterval, getAndCheckCurrentTab, getColorHex, getDomainFromURL, getElapsedTime, getElapsedTimeMinutes, getGradientCanvasContext, getIconColor, getIconImageData, getLocalStorageKey, gradientCanvas, gradientCanvasContext, iconCanvas, isClockRunning, isOverTime, run, runClock, setElapsedTime, stopClock, updateClock, updateIcon;

  activeTab = null;

  clockInterval = null;

  iconCanvas = null;

  gradientCanvas = null;

  gradientCanvasContext = null;

  run = function() {
    chrome.tabs.onUpdated.addListener(getAndCheckCurrentTab);
    chrome.tabs.onActivated.addListener(getAndCheckCurrentTab);
    chrome.windows.onFocusChanged.addListener(getAndCheckCurrentTab);
    return updateIcon();
  };

  getAndCheckCurrentTab = function() {
    return chrome.windows.getCurrent({}, function(window) {
      if (!window) {
        stopClock();
        return;
      }
      return chrome.tabs.query({
        active: true,
        windowId: window.id
      }, function(tabs) {
        if (!(tabs && tabs.length > 0)) {
          stopClock();
          return;
        }
        return checkTab(tabs[0]);
      });
    });
  };

  checkTab = function(tab) {
    var domain, foundIndex, matched, url, watchDomain, _i, _len, _ref;
    if (!(tab && tab.active)) {
      stopClock();
      return;
    }
    url = tab.url;
    domain = getDomainFromURL(url);
    if (!domain) {
      stopClock();
      return;
    }
    matched = false;
    _ref = WebTime.config.defaultWatchURLs;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      watchDomain = _ref[_i];
      foundIndex = domain.indexOf(watchDomain);
      if (foundIndex !== -1) {
        runClock(watchDomain);
        matched = true;
        break;
      }
    }
    if (!matched) {
      return stopClock();
    }
  };

  runClock = function() {
    if (!isClockRunning()) {
      clockInterval = setInterval(updateClock, WebTime.config.timeInterval);
      return updateIcon();
    }
  };

  stopClock = function() {
    if (isClockRunning()) {
      clearInterval(clockInterval);
      clockInterval = null;
      return updateIcon();
    }
  };

  getLocalStorageKey = function() {
    var currentDate, day, localStorageKey, localStorageKeyBase, month, year;
    currentDate = new Date();
    day = currentDate.getDate();
    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();
    localStorageKeyBase = WebTime.config.localStorageKeyBase;
    localStorageKey = localStorageKeyBase + year + '-' + month + '-' + day;
    return localStorageKey;
  };

  getElapsedTime = function() {
    var elapsedTime, localStorageKey;
    localStorageKey = getLocalStorageKey();
    elapsedTime = localStorage.getItem(localStorageKey);
    if (!elapsedTime) {
      elapsedTime = 0;
    } else {
      elapsedTime = parseInt(elapsedTime);
    }
    return elapsedTime;
  };

  getElapsedTimeMinutes = function() {
    var elapsedTime, elapsedTimeMinutes;
    elapsedTime = getElapsedTime();
    elapsedTimeMinutes = Math.floor(elapsedTime / (1000 * 60));
    return elapsedTimeMinutes;
  };

  setElapsedTime = function(elapsedTime) {
    var localStorageKey;
    localStorageKey = getLocalStorageKey();
    return localStorage.setItem(localStorageKey, elapsedTime);
  };

  updateClock = function(elapsedTime) {
    elapsedTime = getElapsedTime();
    elapsedTime += parseInt(WebTime.config.timeInterval);
    setElapsedTime(elapsedTime);
    return updateIcon();
  };

  isClockRunning = function() {
    if (clockInterval) {
      return true;
    }
    return false;
  };

  updateIcon = function() {
    var imageData, text;
    imageData = getIconImageData();
    chrome.browserAction.setIcon({
      imageData: imageData
    });
    if (isClockRunning()) {
      chrome.browserAction.setBadgeBackgroundColor({
        color: WebTime.config.badgeColor
      });
      text = getElapsedTimeMinutes();
      if (isOverTime()) {
        text += 'X';
      } else {
        text += '!';
      }
      return chrome.browserAction.setBadgeText({
        text: text
      });
    } else {
      return chrome.browserAction.setBadgeText({
        text: ''
      });
    }
  };

  isOverTime = function() {
    var elapsedTime, fractionElapsed;
    elapsedTime = getElapsedTime();
    fractionElapsed = elapsedTime / WebTime.config.maxTimePerDay;
    if (fractionElapsed >= 1) {
      return true;
    }
    return false;
  };

  getIconColor = function() {
    var colorString, data, elapsedTime, fractionElapsed, gradientWidth, x;
    elapsedTime = getElapsedTime();
    fractionElapsed = elapsedTime / WebTime.config.maxTimePerDay;
    if (fractionElapsed > 1) {
      fractionElapsed = 1;
    }
    gradientWidth = WebTime.config.gradientWidth;
    x = Math.floor(fractionElapsed * (gradientWidth - 1));
    data = getGradientCanvasContext().getImageData(x, 0, 1, 1).data;
    colorString = '#';
    colorString += getColorHex(data[0]);
    colorString += getColorHex(data[1]);
    colorString += getColorHex(data[2]);
    return colorString;
  };

  getColorHex = function(colorValue) {
    var hex;
    hex = colorValue.toString(16);
    if (hex === '0') {
      hex = '00';
    }
    return hex;
  };

  getGradientCanvasContext = function() {
    var gradient, gradientHeight, gradientWidth;
    if (gradientCanvasContext) {
      return gradientCanvasContext;
    }
    gradientWidth = WebTime.config.gradientWidth;
    gradientHeight = 1;
    gradientCanvas = document.createElement('canvas');
    gradientCanvasContext = gradientCanvas.getContext('2d');
    gradientCanvas.width = gradientWidth;
    gradientCanvas.height = gradientHeight;
    gradient = gradientCanvasContext.createLinearGradient(0, 0, gradientWidth - 1, gradientHeight - 1);
    gradient.addColorStop(0, WebTime.config.gradientStartColor);
    gradient.addColorStop(1 / 3, WebTime.config.gradientOneThirdColor);
    gradient.addColorStop(2 / 3, WebTime.config.gradientTwoThirdsColor);
    gradient.addColorStop(1, WebTime.config.gradientStopColor);
    gradientCanvasContext.fillStyle = gradient;
    gradientCanvasContext.fillRect(0, 0, gradientWidth, gradientHeight);
    return gradientCanvasContext;
  };

  getIconImageData = function() {
    var canvasContext, canvasWidth, centerX, centerY, color, imageData, radius;
    if (!iconCanvas) {
      iconCanvas = document.createElement('canvas');
    }
    canvasContext = iconCanvas.getContext('2d');
    canvasWidth = WebTime.config.iconWidthAndHeight;
    iconCanvas.width = iconCanvas.height = canvasWidth;
    centerX = iconCanvas.width / 2;
    centerY = iconCanvas.width / 2;
    radius = iconCanvas.width / 2;
    color = getIconColor();
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = color;
    canvasContext.fill();
    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = color;
    canvasContext.stroke();
    imageData = canvasContext.getImageData(0, 0, canvasWidth, canvasWidth);
    return imageData;
  };

  getDomainFromURL = function(url) {
    var domain, matches, regex;
    if (!url) {
      return '';
    }
    regex = /^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
    matches = url.match(regex);
    domain = '';
    if (matches && matches[1]) {
      domain = matches[1];
    }
    return domain;
  };

  run();

}).call(this);
