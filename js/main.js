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
var getComment = function() {
    var comment = {
        avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
        message: MESSAGE_ARRAY[getRandomNumber(0, 6)],
        name: NAME_ARRAY[getRandomNumber(0, 6)]
    }
    return comment;

};


var createPhoto = function(index) {
    return {
        url: 'photos/' + index + '.jpg',
        likes: getRandomNumber(0, 250),
        comments: getComment()
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

console.log(photos)


// Создание DOM-элементов
var picture = document.querySelector('.picture__img');
picture.src = photos.url; // ??? как правильно подставить содержание элемента

var likesCount = document.querySelector('.likes-count');
likesCount.textContent = likes;

var commentsCount = document.querySelector('.comments-count');
commentsCount.textContent = comments;  // ??? количество комментариев - у меня по одному получается всегда к каждой фотке, как сделать несколько?





