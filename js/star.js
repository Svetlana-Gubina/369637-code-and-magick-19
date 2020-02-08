'use strict';
(function () {
  var shop = document.querySelector('.setup-artifacts-shop');
  var cell = document.querySelector('.setup-artifacts-shop').children[0];
  var star = shop.querySelector('.setup-artifacts-cell').children[0];
  var setupArtifacts = document.querySelector('.setup-artifacts');
  var targetCell = setupArtifacts.children[0];
  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  };
  window.popup.userDialog.coords = getCoords(window.popup.userDialog);

  star.addEventListener('mousedown', function (evt) {
    targetCell.style.outline = '2px solid yellow';
    evt.preventDefault();
    star.style.position = 'absolute';
    star.style.zIndex = 1000;
    star.ondragstart = function () {
      return false;
    };
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var starPosition = {
        x: star.offsetLeft - shift.x,
        y: star.offsetTop - shift.y
      };

      if (starPosition.x < 0) {
        starPosition.x = 0;
      }
      if (starPosition.x > window.popup.userDialog.offsetWidth - star.offsetWidth) {
        starPosition.x = window.popup.userDialog.offsetWidth - star.offsetWidth;
      }
      if (starPosition.y < 0) {
        starPosition = 0;
      }
      if (starPosition.y > window.popup.userDialog.offsetHeight - star.offsetHeight) {
        starPosition.x = window.popup.userDialog.offsetHeight - star.offsetHeight;
      }
      star.style.left = starPosition.x + 'px';
      star.style.top = starPosition.y + 'px';

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      // Проверяем позицию звездочки в момент mouseup'а, если она над "рюкзаком" - помещаем в его первую клетку,
      // если нет - возвращаем в "магазин"
      window.setup.hide(star);
      var elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      window.setup.show(star);

      var getRelCoords = function (elem) {
        var box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset - getCoords(window.popup.userDialog).top,
          left: box.left + pageXOffset - getCoords(window.popup.userDialog).left,
        };
      };

      var putStar = function (elem) {
        star.style.left = getRelCoords(elem).left + 'px';
        star.style.top = getRelCoords(elem).top + 'px';
        targetCell.style.outline = 'none';
      };
      if (!elemBelow) {
        return;
      }
      var droppableBelow = elemBelow.closest('.setup-artifacts');
      if (droppableBelow) {
        putStar(setupArtifacts);
      } else {
        putStar(cell);
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
