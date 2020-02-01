'use strict';
(function () {
  var dialogHandle = window.setup.userDialog.querySelector('.upload');

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
      window.setup.userDialog.style.left = (window.setup.userDialog.offsetLeft - shift.x) + 'px';
      window.setup.userDialog.style.top = (window.setup.userDialog.offsetTop - shift.y) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      if (dragged) {
        var clickListenerRemoveHandler = function (rEvt) {
          rEvt.preventDefault();
          window.setup.userDialog.removeEventListener('click', clickListenerRemoveHandler);
        };
        window.setup.userDialog.addEventListener('click', clickListenerRemoveHandler);
      }
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
