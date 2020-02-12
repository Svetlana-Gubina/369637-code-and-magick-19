'use strict';
(function () {
  var getRandomOfArray = function (arr) {
    var len = arr.length;
    var index = Math.floor(Math.random() * len);
    var element = arr[index];
    return element;
  };

  var character = {
    eyesChangeHandler: function (_color) {},
    coatChangeHandler: function (_color) {},
    fireballChangeHandler: function (_color) {}
  };

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizardAppearance = document.querySelector('.setup-wizard-appearance');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var eyesHidden = wizardAppearance.querySelector('input[name="eyes-color"]');
  var wizardCoat = document.querySelector('.wizard-coat');
  var coatHidden = wizardAppearance.querySelector('input[name="coat-color"]');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var fireballHidden = wizardFireball.querySelector('input[name="fireball-color"]');

  document.querySelector('.setup-similar').classList.remove('hidden');

  var changeColor = function (elem) {
    switch (elem) {
      case wizardFireball:
        var fireballStyle = getRandomOfArray(FIREBALL_COLORS);
        wizardFireball.style = 'background:' + fireballStyle;
        fireballHidden.value = fireballStyle;
        character.fireballChangeHandler(fireballStyle);
        break;
      case wizardCoat:
        var coatColorStyle = getRandomOfArray(COAT_COLORS);
        wizardCoat.style = 'fill:' + coatColorStyle;
        coatHidden.value = coatColorStyle;
        character.coatChangeHandler(coatColorStyle);
        break;
      case wizardEyes:
        var eyesColorStyle = getRandomOfArray(EYES_COLORS);
        wizardEyes.style = 'fill:' + eyesColorStyle;
        eyesHidden.value = eyesColorStyle;
        character.eyesChangeHandler(eyesColorStyle);
        break;
    }
    return elem;
  };

  wizardAppearance.addEventListener('click', function (evt) {
    if (evt.target === wizardEyes) {
      changeColor(wizardEyes);
    } else if (evt.target === wizardCoat) {
      changeColor(wizardCoat);
    }
  });

  wizardFireball.addEventListener('click', function () {
    changeColor(wizardFireball);
  });

  window.wizard = {
    character: character
  };
  return window.wizard.character;

})();
