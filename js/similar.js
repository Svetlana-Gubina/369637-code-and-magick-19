'use strict';
(function () {
  var fireballColor;
  var coatColor;
  var eyesColor;
  var wizards = [];


  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 3;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 2;
    }
    if (wizard.colorFireball === fireballColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render.renderSimilarWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.character.eyesChangeHandler = window.debounce.deb(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.character.coatChangeHandler = window.debounce.deb(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.wizard.character.fireballChangeHandler = window.debounce.deb(function (color) {
    fireballColor = color;
    updateWizards();
  });


  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.setup.errorHandler);
})();
