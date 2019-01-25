'use strict';
(function () {
// Валидация хэш-тегов

  var formUploadPhoto = document.querySelector('.img-upload__form');
  var buttonPublish = document.querySelector('.img-upload__submit');

  var hashtags = formUploadPhoto.querySelector('.text__hashtags');

  function checkOctothorpe(hashtagsArrayElement) {
    return hashtagsArrayElement !== '#' ? true : false;
  }

  function checkHashtagMaxLength(hashtagsArrayElement) {
    return hashtagsArrayElement.length > 20 ? true : false;
  }

  function checkHashtagMinLength(hashtagsArrayElement) {
    return hashtagsArrayElement.length < 2 ? true : false;
  }

  function checkHashtagsRepeat(hashtagsArrayElement) {
    var hashtagsObj = {};

    for (var repeat = 0; repeat < hashtagsArrayElement.length; repeat++) {
      var key = hashtagsArrayElement[repeat];
      if (hashtagsObj[key]) {
        return true;
      }
      hashtagsObj[key] = true;
    }
    return false;
  }

  buttonPublish.addEventListener('click', function () {
    if (hashtags.value) {
      var hashtagsValue = hashtags.value.toLowerCase();
      var hashtagsArray = hashtagsValue.split(' ');
      var hashtagsArrayElement;

      if (checkHashtagsRepeat(hashtagsArray)) {
        hashtags.setCustomValidity('Хэштеги не могут повторятся');
        hashtags.style.outlineColor = 'red';
        return;
      } else if (hashtagsArray.length > 5) {
        hashtags.setCustomValidity('Максимальное кол-во хэштегов не может быть больше 5');
        hashtags.style.outlineColor = 'red';
        return;
      }

      for (var i = 0; i < hashtagsArray.length; i++) {
        hashtagsArrayElement = hashtagsArray[i].split('');

        if (checkOctothorpe(hashtagsArrayElement[0])) {
          hashtags.setCustomValidity('Хэштеги должны начинаться с #');
          hashtags.style.outlineColor = 'red';
          return;
        } else if (checkHashtagMaxLength(hashtagsArrayElement)) {
          hashtags.setCustomValidity('Длина хэштега не может быть более 20 символов, включая #');
          hashtags.style.outlineColor = 'red';
          return;
        } else if (checkHashtagMinLength(hashtagsArrayElement)) {
          hashtags.setCustomValidity('Хэштег не может состоять только из #');
          hashtags.style.outlineColor = 'red';
          return;
        }
      }

      hashtags.setCustomValidity('');
    }
  });
  window.formUploadPhoto = formUploadPhoto;
})();
