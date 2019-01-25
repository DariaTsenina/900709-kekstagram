'use strict';

(function () {
    var main = document.querySelector('main');

  // ------------------------------------------------------------------------------------------------
  window.formUploadPhoto.addEventListener('submit', function (evt) {
      uploadOverlay.classList.add('hidden');
      openSuccessMessage();
      function () {
      uploadOverlay.classList.add('hidden');
      openErrorMessage();
    });

    evt.preventDefault();
  });
  // ------------------------------------------------------------------------------------------------
  // ОКНО УСПЕШНОЙ ЗАГРУЗКИ ФОТО
  // открытие окна успешной загрузки
  function openSuccessMessage() {
    var successTemplate = document.querySelector('#success').content;
    var messageSuccess = successTemplate.cloneNode(true);
    var successButton = messageSuccess.querySelector('.success__button');

    main.appendChild(messageSuccess);
    successButton.addEventListener('click', closeMessageSuccess);
    document.addEventListener('click', closeMessageSuccess);
    document.addEventListener('keydown', closeMessageSuccessEsc);
  }

  // закрытие окна успешной загрузки
  function closeMessageSuccess() {
    var successTemplate = document.querySelector('#success').content;
    var messageSuccess = successTemplate.cloneNode(true);
    var successButton = messageSuccess.querySelector('.success__button');
    var popupSuccess = main.querySelector('.success');
    popupSuccess.remove();
    successButton.removeEventListener('click', closeMessageSuccess);
    document.removeEventListener('click', closeMessageSuccess);
    document.removeEventListener('keydown', closeMessageSuccessEsc);
  }

  function closeMessageSuccessEsc(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeMessageSuccess();
    }
  }

  // ------------------------------------------------------------------------------------------------
  // ОКНО ОШИБКИ ЗАГРУЗКИ ФОТО
  function openErrorMessage() {
    var errorTemplate = document.querySelector('#error').content;
    var errorMessage = errorTemplate.cloneNode(true);
    var buttonTryAgain = errorMessage.querySelector('.error__button:nth-child(1)');
    var buttonOtherFile = errorMessage.querySelector('.error__button:nth-child(2)');
    var errorUpload = main.querySelector('.error');
    main.appendChild(errorMessage);
    buttonTryAgain.addEventListener('click', closeErrorMessage);
    buttonOtherFile.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', closeErrorMessageEsc);
    errorUpload.addEventListener('click', closeErrorMessage);
  }

  // закрытие окна ошибки загрузки
  function closeErrorMessage() {
    var errorTemplate = document.querySelector('#error').content;
    var errorMessage = errorTemplate.cloneNode(true);
    var buttonTryAgain = errorMessage.querySelector('.error__button:nth-child(1)');
    var buttonOtherFile = errorMessage.querySelector('.error__button:nth-child(2)');
    var errorUpload = main.querySelector('.error');
    errorUpload.remove();
    buttonTryAgain.removeEventListener('click', closeErrorMessage);
    buttonOtherFile.removeEventListener('click', closeErrorMessage);
    document.removeEventListener('keydown', closeErrorMessageEsc);
    errorUpload.removeEventListener('click', closeErrorMessage);
  }

  function closeErrorMessageEsc(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeMessageSuccess();
    }
  }
})();
