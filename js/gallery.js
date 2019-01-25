'use strict';

(function () {

  var photosList = [];
  var selectedPhotosList = [];

  var showComments = 5;
  var currentPhoto = null;

  // Вывод подробной информации о конкретной фотографии
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var commentsContainer = document.querySelector('.social__comments');

  commentsLoader.addEventListener('click', function () {
    showComments += 5;
    if (showComments > currentPhoto.comments.length) {
      showComments = currentPhoto.comments.length;
      commentsLoader.classList.add('hidden');
    }

    commentCount.childNodes[0].textContent = showComments + ' из ';

    var comments = outputPhotoComments(currentPhoto, showComments);

    commentsContainer.innerHTML = '';
    commentsContainer.appendChild(comments);
  });

  function outputPhotoInfo(photoIndex) {
    var photo = currentPhoto = selectedPhotosList[photoIndex];
    var commentsLength = showComments;

    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    if (photo.comments.length < commentsLength) {
      commentsLength = photo.comments.length;
      commentsLoader.classList.add('hidden');
    }

    commentCount.childNodes[0].textContent = commentsLength + ' из ';

    var comment = outputPhotoComments(photo, commentsLength);

    commentsContainer.innerHTML = '';
    commentsContainer.appendChild(comment);
  }

  function outputPhotoComments(photo, max) {
    if (photo.comments.length < max) {
      max = photo.comments.length;
    }

    var commentsList = document.createDocumentFragment();
    for (var i = 0; i < max; i++) {
      var commentTmp = bigPicture.querySelector('.social__comment').cloneNode(true);
      var comment = photo.comments[i];

      commentTmp.querySelector('.social__picture').src = comment.avatar;
      commentTmp.querySelector('.social__text').textContent = comment.message;

      commentsList.appendChild(commentTmp);
    }

    return commentsList;
  }

  function showBigPicture() {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keyup', onBigPictureHiddenKeyup);
  }

  function hiddenBigPicture() {
    bigPicture.classList.add('hidden');
    commentsLoader.classList.remove('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keyup', onBigPictureHiddenKeyup);

    currentPhoto = null;
    showComments = 5;
  }

  function onBigPictureHiddenKeyup(evt) {
    if (evt.keyCode === window.main.ESC_KEYCODE) {
      hiddenBigPicture();
    }
  }

  function onBigPictureHiddenClick() {
    hiddenBigPicture();
  }

  bigPictureCancel.addEventListener('click', onBigPictureHiddenClick);

  function onLoad(data) {
    photosList = selectedPhotosList = data;
    outputPhotoList(photosList);
    imgFilters.classList.remove('img-filters--inactive');
  }

  function onError() {
    window.main.createMessage('Ошибка: не удалось получить данные с сервера.', 'error');
  }

  // Получаем JSON данные фотографий с сервера
  window.loadData(onLoad, onError);
}());
