'use strict';

(function () {

  // Открытие большого фото
  var bigPicture = document.querySelector('.big-picture');

  // Открытие окна с фото
  var bodyHtml = document.querySelector('body');
  var pictures = document.querySelector('.pictures');
  var bigPictureClouse = bigPicture.querySelector('.big-picture__cancel');


  pictures.addEventListener('click', function (evt) {
    var target = evt.target;


    while (target !== pictures) {
      if (target.tagName === 'A') {
        evt.preventDefault();
        bodyHtml.classList.add('modal-open');
        bigPicture.classList.remove('hidden');
      }
      target = target.parentNode;
      bigPictureClouse.addEventListener('click', closeBigPhoto);
      document.addEventListener('keydown', closeBigPhotoEsc);
    }
  });


  // закрытие окна
  function closeBigPhoto() {
    bigPicture.classList.add('hidden');
    bodyHtml.classList.remove('modal-open');
    bigPictureClouse.removeEventListener('click', closeBigPhoto);
    document.removeEventListener('keydown', closeBigPhotoEsc);
  }

  function closeBigPhotoEsc(evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closeBigPhoto();
    }
  }

  bigPictureClouse.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', closeBigPhotoEsc);

  window.bigPicture = bigPicture;

})();
