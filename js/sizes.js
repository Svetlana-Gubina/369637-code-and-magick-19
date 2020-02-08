'use strict';
(function () {
  var FIREBALLSIZE = 22;
  var FIREBALL_LEFT_SPEED = 5;
  var FIREBALL_RIGHT_SPEED = 2;
  var wizardWidth = 70;
  var wizardSpeed = 3;
  var RATIO = 1.337;
  var getWizardHeight = function () {
    var wizardHeight = RATIO * wizardWidth;
    return wizardHeight;
  };
  var getFireballSpeed = function (left) {
    return left ? FIREBALL_LEFT_SPEED : FIREBALL_RIGHT_SPEED;
  };
  var getWizardX = function (width) {
    var wizardX = width / 2 - wizardWidth / 2;
    return wizardX;
  };
  var getWizardY = function (height) {
    var wizardY = height - 2 / 3 * height - getWizardHeight() / 2;
    return wizardY;
  };
  window.sizes = {
    FIREBALLSIZE: FIREBALLSIZE,
    getFireballSpeed: getFireballSpeed,
    wizardSpeed: wizardSpeed,
    getWizardX: getWizardX,
    getWizardY: getWizardY
  };
})();
