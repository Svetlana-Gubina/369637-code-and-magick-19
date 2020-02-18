'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var TOP = '80px';
  var LEFT = '50%';
  var reg = /\.(?:jpg|jpeg|gif|png)$/;
  var avatar = userDialog.querySelector('.upload').firstElementChild;
  var fileInput = userDialog.querySelector('.upload').lastElementChild;

  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();
    if (reg.test(fileName)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      });
      reader.addEventListener('error', function () {
        window.setup.errorHandler('Ошибка загрузки. Пожалуйста, попробуйте еще раз.');
      });
      reader.readAsDataURL(file);
    }
  });

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
    if (document.body.firstElementChild.classList.contains('errorMessage')) {
      document.body.firstElementChild.remove();
    }
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
