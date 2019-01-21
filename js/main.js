'use strict';

// получение рандомного числа
var getRandomNumber = function(min, max) {
  var randomNumber = min - 0.5 + Math.random() * (max - min + 1)
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
]

// создание массива комментариев
var createComment = function() {
  var comment = {
    avatar: 'img/avatar-' + getRandomNumber(0, 5) + '.svg',
    message: MESSAGE_ARRAY[getRandomNumber(0, 5)],
    name: NAME_ARRAY[getRandomNumber(0, 5)]
  }
  return comment;

};

var getComment = function(length) {
  var comments = []
  for (var i = 1; i <= length; i++) {
    comments.push(createComment(i))
  }
  return comments; 
};

var createPhoto = function(index) {
  return {
    url: 'photos/' + index + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: getComment(6)
  };
};

var getPhotos = function(length) {
  var photos = []
  for (var i = 1; i <= length; i++) {
    photos.push(createPhoto(i))
  }
  return photos;
};

var photos = getPhotos(25);

// Создание DOM-элементов
var pictures = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function(photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photos[i].url;
  photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
  photoElement.querySelector('.picture__comments').textContent = photos[i].comments.length;

  return photoElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}
pictures.appendChild(fragment);