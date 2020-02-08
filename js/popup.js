'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var TOP = '80px';
  var LEFT = '50%';

  var openUserDialog = function () {
    window.setup.show(userDialog);
    userDialog.style.top = TOP;
    userDialog.style.left = LEFT;
    setupClose.addEventListener('click', closeUserDialog);
    document.addEventListener('keydown', escPressCloseUserDialog);
  };

  var closeUserDialog = function () {
    window.setup.hide(userDialog);
    document.removeEventListener('keydown', escPressCloseUserDialog);
  };

  var escPressCloseUserDialog = function (evt) {
    if (evt.key === 'Escape') {
      closeUserDialog();
    }
  };

  setupOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    openUserDialog();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openUserDialog();
    }
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closeUserDialog();
    }
  });

  window.popup = {
    userDialog: userDialog
  };
})();
