// --------------popup---------------

import { updatePopupBag } from "./cart.js";

let getBag = localStorage.getItem("bag");
let bag = JSON.parse(getBag);
if (bag === null) {
  bag = [];
}

updatePopupBag(bag);

// -----------------------------------------

const form = document.querySelector("button");

form.addEventListener("click", validateForm);

function validateForm(event) {
  event.preventDefault();

  const email = document.querySelector("#input-email");
  const emailError = document.querySelector("#email-error");

  const message = document.querySelector("#input-message");
  const messageError = document.querySelector("#message-error");

  const isFormValid = document.querySelector("#isFormValid");

  const isEmailValid = email.value.length > 0 && validateEmail(email.value);
  if (isEmailValid) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  const isMessageValid = message.value.length >= 10;
  if (isMessageValid) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (isMessageValid && isEmailValid) {
    isFormValid.style.display = "block";
    document.querySelector("form").reset();
  } else {
    isFormValid.style.display = "none";
    // form.reset();
    // console.log("validation passed");
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
