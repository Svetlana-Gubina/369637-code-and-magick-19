'use strict';
(function () {
  // Service functions
  var show = function (elem) {
    elem.classList.remove('hidden');
  };

  var hide = function (elem) {
    elem.classList.add('hidden');
  };

  var getRandomOfArray = function (arr) {
    var len = arr.length;
    var index = Math.floor(Math.random() * len);
    var element = arr[index];
    return element;
  };

  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var TOP = '80px';
  var LEFT = '50%';

  var openUserDialog = function () {
    show(userDialog);
    userDialog.style.top = TOP;
    userDialog.style.left = LEFT;
    setupClose.addEventListener('click', closeUserDialog);
    document.addEventListener('keydown', escPressCloseUserDialog);
  };

  var closeUserDialog = function () {
    hide(userDialog);
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

  document.querySelector('.setup-similar').classList.remove('hidden');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
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
  var changeColor = function (elem) {
    switch (elem) {
      case wizardFireball:
        var fireballStyle = getRandomOfArray(FIREBALL_COLORS);
        wizardFireball.style = 'background:' + fireballStyle;
        fireballHidden.value = fireballStyle;
        break;
      case wizardCoat:
        var coatColorStyle = getRandomOfArray(COAT_COLORS);
        wizardCoat.style = 'fill:' + coatColorStyle;
        coatHidden.value = coatColorStyle;
        break;
      case wizardEyes:
        var eyesColorStyle = getRandomOfArray(EYES_COLORS);
        wizardEyes.style = 'fill:' + eyesColorStyle;
        eyesHidden.value = eyesColorStyle;
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

  var Wizard = function (name) {
    this.name = name;
    this.lastName = getRandomOfArray(WIZARD_LAST_NAMES);
    this.coatColor = getRandomOfArray(COAT_COLORS);
    this.eyesColor = getRandomOfArray(EYES_COLORS);
  };

  var getRandomWizards = function () {
    var wizards = [];
    for (var i = 0; i < 4; i++) {
      var wizardElement = new Wizard(getRandomOfArray(WIZARD_NAMES));
      wizards.push(wizardElement);
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastName;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  getRandomWizards().map(function (item) {
    fragment.appendChild(renderWizard(item));
  });
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  window.setup = {
    userDialog: userDialog,
    show: show,
    hide: hide,
  };
})();
