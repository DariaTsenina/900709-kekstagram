'use strict';

(function () {

  // Создание DOM-элементов
  var renderPhotos = function (photos) {
    var pictures = document.querySelector('.pictures');
    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
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

  window.loadData(renderPhotos);

})();
