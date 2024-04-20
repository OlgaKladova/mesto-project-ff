function showInputError(formElement, inputElement, errorMessage, object) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(object.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.errorClass);
};

function hideInputError(formElement, inputElement, object) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
    errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState (inputList, buttonElement, object) {
    if(hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(object.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(object.inactiveButtonClass);
    }
};

function checkInputValidity (formElement, inputElement, object) {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid ) {
        showInputError(formElement, inputElement, inputElement.validationMessage, object);
    } else {
        hideInputError(formElement, inputElement, object);
    }
};

function setEventListeners (formElement, object) {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity (formElement, inputElement, object);
            toggleButtonState(inputList, buttonElement, object);
        });
    });
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, object);
};

function enableValidation(object) {
    const formLiist = Array.from(document.querySelectorAll(object.formSelector));
    formLiist.forEach((formElement) => {
        setEventListeners (formElement, object);
    });
};

function clearValidation(formElement, object) {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, object);
    })
    toggleButtonState(inputList, buttonElement, object);
};

export {enableValidation, clearValidation};