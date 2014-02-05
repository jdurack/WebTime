(function() {
  var addEvents, addWatchURLToForm, addWatchURLsToForm, checkAndAddNewWatchURL, formSubmitEvent, getMaxMinutesPerDayElement, getNewWatchURLElement, init, maxMinutesPerDayChangeEvent, newWatchURLBlurEvent, newWatchURLKeypressEvent, removeEvents, removeWatchURL, removeWatchURLClickEvent, resetEvents, resetForm, setMaxMinutesPerDayValue;

  init = function() {
    return resetForm();
  };

  addWatchURLsToForm = function() {
    var index, watchURL, watchURLs, _i, _len, _results;
    watchURLs = WebTime.utils.getWatchURLs();
    addWatchURLToForm();
    _results = [];
    for (index = _i = 0, _len = watchURLs.length; _i < _len; index = ++_i) {
      watchURL = watchURLs[index];
      _results.push(addWatchURLToForm(index, watchURL));
    }
    return _results;
  };

  addWatchURLToForm = function(index, watchURL, prepend) {
    var watchURLHTML, watchURLTemplate;
    watchURLTemplate = WebTime.utils.getTemplate('watchURL');
    watchURLHTML = watchURLTemplate({
      index: index,
      url: watchURL
    });
    if (prepend) {
      return $('#watchURL-new').after(watchURLHTML);
    } else {
      return $('#watchURLs').append(watchURLHTML);
    }
  };

  addEvents = function() {
    $('#maxMinutesPerDay').on('change', maxMinutesPerDayChangeEvent);
    $('.removeWatchURL').on('click', removeWatchURLClickEvent);
    $('#newWatchURL').on('blur', newWatchURLBlurEvent);
    $('#newWatchURL').on('keypress', newWatchURLKeypressEvent);
    return $('#optionsForm').on('submit', formSubmitEvent);
  };

  removeEvents = function() {
    $('#maxMinutesPerDay').off('change', maxMinutesPerDayChangeEvent);
    $('.removeWatchURL').off('click', removeWatchURLClickEvent);
    $('#newWatchURL').off('blur', newWatchURLBlurEvent);
    $('#newWatchURL').off('keypress', newWatchURLKeypressEvent);
    return $('#optionsForm').off('submit', formSubmitEvent);
  };

  resetEvents = function() {
    removeEvents();
    return addEvents();
  };

  maxMinutesPerDayChangeEvent = function(event) {
    var element, newMaxMinutesPerDay, newMaxSecondsPerDay;
    element = getMaxMinutesPerDayElement();
    newMaxMinutesPerDay = element.value;
    newMaxSecondsPerDay = newMaxMinutesPerDay * 60;
    return WebTime.utils.setMaxSecondsPerDay(newMaxSecondsPerDay);
  };

  removeWatchURLClickEvent = function(event) {
    var index, indicator;
    indicator = 'removeWatchURL-';
    index = event.currentTarget.id.substr(indicator.length);
    return removeWatchURL(index);
  };

  newWatchURLBlurEvent = function(event) {
    return checkAndAddNewWatchURL();
  };

  newWatchURLKeypressEvent = function(event) {
    var keyCode;
    keyCode = event.keyCode;
    if (keyCode === 13) {
      return checkAndAddNewWatchURL();
    }
  };

  formSubmitEvent = function(event) {
    event.preventDefault();
    checkAndAddNewWatchURL();
    return false;
  };

  getNewWatchURLElement = function() {
    var element;
    element = $('#newWatchURL')[0];
    return element;
  };

  getMaxMinutesPerDayElement = function() {
    var element;
    element = $('#maxMinutesPerDay')[0];
    return element;
  };

  checkAndAddNewWatchURL = function() {
    var existingIndex, watchURL, watchURLs;
    watchURL = getNewWatchURLElement().value;
    if (!watchURL) {
      return;
    }
    watchURL = watchURL.toLowerCase();
    watchURLs = WebTime.utils.getWatchURLs();
    existingIndex = watchURLs.indexOf(watchURL);
    if (existingIndex !== -1) {
      return;
    }
    watchURLs.unshift(watchURL);
    WebTime.utils.setWatchURLs(watchURLs);
    return resetForm();
  };

  resetForm = function() {
    $('.watchURL').remove();
    addWatchURLsToForm();
    setMaxMinutesPerDayValue();
    getNewWatchURLElement().focus();
    return resetEvents();
  };

  setMaxMinutesPerDayValue = function() {
    var maxMinutesPerDay, maxSecondsPerDay;
    maxSecondsPerDay = WebTime.utils.getMaxSecondsPerDay();
    maxMinutesPerDay = Math.floor(maxSecondsPerDay / 60);
    return getMaxMinutesPerDayElement().value = maxMinutesPerDay;
  };

  removeWatchURL = function(index) {
    var watchURLs;
    if (!(index >= 0)) {
      return;
    }
    watchURLs = WebTime.utils.getWatchURLs();
    if (!(watchURLs && watchURLs.length > index)) {
      return;
    }
    watchURLs.splice(index, 1);
    WebTime.utils.setWatchURLs(watchURLs);
    $('#watchURL-' + index).remove();
    return resetForm();
  };

  $(document).ready(init);

}).call(this);
