'use strict';

// Получение рандомного числа
var getRandomNumber = function (min, max) {
  var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
  randomNumber = Math.round(randomNumber);
  return randomNumber;
};

var MESSAGE_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAME_ARRAY = [
  'Вадим',
  'Валентин',
  'Валерий',
  'Валерьян',
  'Варлам',
  'Варфоломей'
];

// Создание массива комментариев
var createComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomNumber(0, 5) + '.svg',
    message: MESSAGE_ARRAY[getRandomNumber(0, 5)],
    name: NAME_ARRAY[getRandomNumber(0, 5)]
  };
  return comment;

};

var getComment = function (length) {
  var comments = [];
  for (var i = 1; i <= length; i++) {
    comments.push(createComment(i));
  }
  return comments;
};

var createPhoto = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: getComment(getRandomNumber(1, 5))
  };
};

var getPhotos = function (length) {
  var photos = [];
  for (var i = 1; i <= length; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

var photos = getPhotos(25);

// Создание DOM-элементов
var pictures = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photos[i].url;
    photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
    photoElement.querySelector('.picture__comments').textContent = photos[i].comments.length;
    fragment.appendChild(photoElement);
  }
  pictures.appendChild(fragment);
};

renderPhotos(photos);

// Загрузка нового изображения на сайт
var imgForm = document.querySelector('.img-upload__overlay');
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var ESC_KEYCODE = 27;

// Открытие/закрытие окна редактирования
uploadFile.addEventListener('change', function () {
  imgForm.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      imgForm.classList.add('hidden');
      uploadFile.value = '';
    }
  });
});

uploadCancel.addEventListener('click', function () {
  imgForm.classList.add('hidden');
  uploadFile.value = '';
});

// Переменные для наложения эффекта на изображение и изменения масштаба
var PIN_MAX_LEVEL = 100;
var PIN_MIN_LEVEL = 0;

var effects = document.querySelector('.effects');
var preview = document.querySelector('.img-upload__preview > img');
var effectLevelPin = document.querySelector('.effect-level__pin');
var levelLine = document.querySelector('.effect-level__line');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevel = document.querySelector('.effect-level');

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

  return scaleValue;
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

  return scaleValue;
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
    return level;

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
  return min + (max - min) * (level / 100);
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
  effectLevelPin.addEventListener('mouseup', function () {
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

