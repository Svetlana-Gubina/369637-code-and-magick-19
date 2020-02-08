'use strict';
(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';
  var TARGETURL = 'https://js.dump.academy/code-and-magick';
  window.backend = {
    load: function (loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        return xhr.status === 200 ? loadHandler(xhr.response) : errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      });
      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000;
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        loadHandler(xhr.response);
      });
      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });
      xhr.open('POST', TARGETURL);
      xhr.send(data);
    },
  };
})();
