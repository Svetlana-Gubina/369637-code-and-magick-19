'use strict';
(function () {
  var dialogHandler = window.popup.userDialog.querySelector('.upload');
  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = new Coordinate(evt.clientX, evt.clientY);
    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

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
  window.dialog = {
    dialogHandler: dialogHandler,
  };
})();
