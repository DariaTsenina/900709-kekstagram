'use strict';

(function () {

  var PIN_MAX_LEVEL = 100;
  var PIN_MIN_LEVEL = 0;
  var ESC_KEYCODE = 27;

  // Загрузка нового изображения на сайт
  var imgForm = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');

  // Открытие формы загрузки фото
  uploadFile.addEventListener('change', function () {
    imgForm.classList.remove('hidden');
    effectLevel.classList.add('hidden');

    uploadCancel.addEventListener('click', closeUpload);
    document.addEventListener('keydown', closeUploadEsc);

  });

  // Закрытие формы загрузки фото
  function closeUpload() {
    imgForm.classList.add('hidden');
    uploadCancel.removeEventListener('click', closeUpload);
    document.removeEventListener('keydown', closeUploadEsc);
    uploadFile.value = '';
  }

  function closeUploadEsc(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeUpload();
    }
  }

  // Переменные для наложения эффекта на изображение и изменения масштаба

  var effects = document.querySelector('.effects');
  var preview = document.querySelector('.img-upload__preview > img');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelValue = document.querySelector('.effect-level__value');

  // Масштаб изображения
  var scaleValue = document.querySelector('.scale__control--value');
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonBigger = document.querySelector('.scale__control--bigger');

  scaleValue.value = '100%';

  buttonSmaller.addEventListener('click', function () {
    if (scaleValue.value === '100%') {
      preview.style.transform = 'scale(0.75)';
      scaleValue.value = '75%';
    } else if (scaleValue.value === '75%') {
      preview.style.transform = 'scale(0.5)';
      scaleValue.value = '50%';
    } else if (scaleValue.value === '50%') {
      preview.style.transform = 'scale(0.25)';
      scaleValue.value = '25%';
    }
  });

  buttonBigger.addEventListener('click', function () {
    if (scaleValue.value === '25%') {
      preview.style.transform = 'scale(0.5)';
      scaleValue.value = '50%';
    } else if (scaleValue.value === '50%') {
      preview.style.transform = 'scale(0.75)';
      scaleValue.value = '75%';
    } else if (scaleValue.value === '75%') {
      preview.style.transform = 'scale(1)';
      scaleValue.value = '100%';
    }
  });


  // Перемещение ползунка

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = event.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;
      var level = (effectLevelPin.offsetLeft - shift) / levelLine.clientWidth * 100;
      if (level < PIN_MIN_LEVEL) {
        level = PIN_MIN_LEVEL;
      } else {
        if (level > PIN_MAX_LEVEL) {
          level = PIN_MAX_LEVEL;
        }
      }

      effectLevelPin.style.left = level + '%';
      effectLevelDepth.style.width = level + '%';
      effectLevelValue.value = level;

    };

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Функция расчета интенсивности эффекта
  var effectCalc = function (min, max) {
    return min + (max - min) * (effectLevelValue.value / 100);
  };

  // Изменение фильтра
  effects.addEventListener('change', function (event) {
    var target = event.target;
    var effect = target.value;
    preview.className = 'effects__preview--' + effect;
    preview.removeAttribute('style');
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    scaleValue.value = '100%';

    if (effect === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }

    // Изменение уровня насыщенности фильтра
    effectLevelPin.addEventListener('mousemove', function () {
      if (effect === 'chrome') {
        var effectScale = effectCalc(0, 1);
        preview.setAttribute('style', 'filter: grayscale(' + effectScale + ')');
      } else if (effect === 'sepia') {
        effectScale = effectCalc(0, 1);
        preview.setAttribute('style', 'filter: sepia(' + effectScale + ')');
      } else if (effect === 'marvin') {
        effectScale = effectCalc(0, 100);
        preview.setAttribute('style', 'filter: invert(' + effectScale + '%)');
      } else if (effect === 'phobos') {
        effectScale = effectCalc(0, 3);
        preview.setAttribute('style', 'filter: blur(' + effectScale + 'px)');
      } else {
        effectScale = effectCalc(1, 3);
        preview.setAttribute('style', 'filter: brightness(' + effectScale + ')');
      }
    });

  });


  // Отмена закрытия формы при активных полях
  var commentTextArea = document.querySelector('.text__description');
  var hashtags = document.querySelector('.text__hashtags');

  hashtags.onfocus = function () {
    document.removeEventListener('keydown', closeUploadEsc);
  };

  hashtags.onblur = function () {
    document.addEventListener('keydown', closeUploadEsc);
  };

  commentTextArea.onfocus = function () {
    document.removeEventListener('keydown', closeUploadEsc);
  };

  commentTextArea.onblur = function () {
    document.addEventListener('keydown', closeUploadEsc);
  };

  window.ESC_KEYCODE = ESC_KEYCODE;
})();


