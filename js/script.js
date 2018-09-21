var open = document.querySelector(".contacts-button");
var popup = document.querySelector(".modal-feedback");
var close = popup.querySelector(".modal-close");
var form = popup.querySelector(".feedback-form");
var inputName = form.querySelector("[name=name]");
var inputEmail = form.querySelector("[name=email]");
var inputText = form.querySelector("[name=text]");
var overlay = document.querySelector(".overlay");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

open.addEventListener("click", function (evt) {
  evt.preventDefault();
  overlay.classList.add("overlay-show");
  popup.classList.add("modal-show");

  if (storageName) {
    inputName.value = storageName;
    if (storageEmail) {
      inputEmail.value = storageEmail;
      inputText.focus();
    } else {
      inputEmail.focus();
    }
  } else {
    inputName.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
  overlay.classList.remove("overlay-show");
});

form.addEventListener("submit", function (evt) {
  if (!(inputName.value && inputEmail.value && inputText.value)) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", inputName.value);
      localStorage.setItem("email", inputEmail.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
      overlay.classList.remove("overlay-show");
    }
  }
});
