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

uploadFile.addEventListener('change', function () {
  imgForm.classList.remove('hidden');
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

// Наложение эффекта на изображение
var effects = document.querySelector('.effects');
var preview = document.querySelector('.img-upload__preview');

effects.addEventListener('change', function (event) {
  var target = event.target;
  preview.classList.add('effects__preview--' + target.value);
});

// Изменение уровня насыщенности фильтра
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');


effectLevelPin.addEventListener('mouseup', function () {
  effectLevelValue.value = effectLevelPin.style.left;
  console.log(effectLevelPin.style);
});


