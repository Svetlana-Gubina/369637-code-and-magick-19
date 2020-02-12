'use strict';
(function () {
  // Service functions
  var show = function (elem) {
    elem.classList.remove('hidden');
  };

  var hide = function (elem) {
    elem.classList.add('hidden');
  };

  var successSendHandler = function () {
    hide(window.popup.userDialog);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successSendHandler, errorHandler);
  });

  window.setup = {
    show: show,
    hide: hide,
    errorHandler: errorHandler,
  };
})();
