'use strict';
(function () {
  var dialogHandle = window.popup.userDialog.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };
      window.popup.userDialog.style.left = (window.popup.userDialog.offsetLeft - shift.x) + 'px';
      window.popup.userDialog.style.top = (window.popup.userDialog.offsetTop - shift.y) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      if (dragged) {
        var clickListenerRemoveHandler = function (rEvt) {
          rEvt.preventDefault();
          window.popup.userDialog.removeEventListener('click', clickListenerRemoveHandler);
        };
        window.popup.userDialog.addEventListener('click', clickListenerRemoveHandler);
      }
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
