const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorElementSelector: ".form__error-msg",
  submitBtnSelector: ".form__button_type_save",
  inputInvalidClass: "form__input_invalid",
};

function inputIsValid(input) {
  return input.validity.valid;
}

function hasInvalidInputs(inputs) {
  return inputs.some((input) => !inputIsValid(input));
}

function toggleButtonState(inputs, button) {
  if (hasInvalidInputs(inputs)) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function getValidationMessage(input) {
  return input.validationMessage;
}

function updateValidationMessage(errorElement, input) {
  errorElement.textContent = getValidationMessage(input);
}

function handleInputValidation(input, form, config) {
  const errorElement = form.querySelector(
    `#${input.id} + ${config.errorElementSelector}`
  );

  if (inputIsValid(input)) {
    input.classList.remove(config.inputInvalidClass);
    updateValidationMessage(errorElement, input);
  } else {
    input.classList.add(config.inputInvalidClass);
    updateValidationMessage(errorElement, input);
  }
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    const submitBtn = form.querySelector(config.submitBtnSelector);
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        handleInputValidation(input, form, config);
        toggleButtonState(inputs, submitBtn);
      });
    });
  });
}

enableValidation(settings);
