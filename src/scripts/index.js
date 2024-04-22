import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './card';
import {openPopup, closePopup, animatePopup} from './modal';
import {enableValidation, clearValidation} from './validation';
import {getProfileData, renderCards, changeProfileData, addNewCard, changeAvatar} from './api';
const placesList = document.querySelector('.places__list'); 
const profileImage = document.querySelector('.profile__image');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button'); 
const buttonSubmit = document.querySelector('.popup__button');
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements.link;
const formAvatar = document.forms['avatar-adit'];
const avatarInput = formAvatar.elements.avatar;
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
let userId;

function handleImageClick (evt) {
    const popupTypeImage = document.querySelector('.popup_type_image'); 
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');
    popupImage.src = evt.target.getAttribute('src');
    popupImage.alt = evt.target.getAttribute('alt');
    popupCaption.textContent = evt.target.getAttribute('alt');
    openPopup(popupTypeImage);
};

animatePopup(popups);

popups.forEach((popup) => {  
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});

buttonEdit.addEventListener('click', () => {
    openPopup(popupTypeEdit);
    clearValidation(formEditProfile, validationConfig);
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupTypeNewCard);
});

profileImage.addEventListener('click', () => {
    openPopup(popupTypeAvatar);
    clearValidation(formAvatar, validationConfig);
})

function handleProfileFormSubmit(evt) {
    evt.preventDefault();   
    renderLoading(true);
    changeProfileData(nameInput.value, jobInput.value)
    .then((data) => {
        document.querySelector('.profile__title').textContent = data.name;
        document.querySelector('.profile__description').textContent = data.about;   
    })
    .catch(err => console.log(err))
    .finally(() => {
        renderLoading(false);
    })
    closePopup(popupTypeEdit);
};

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(true);
    const newCard = {
        name: placeInput.value,
        link: linkInput.value
    };
    addNewCard(newCard)
    .then(newCard => placesList.prepend(createCard(newCard, { deleteCard, likeCard, handleImageClick }, userId)) 
    )
    .catch(err => console.log(err) 
    )
    .finally(() => {
        renderLoading(false);
    })
    closePopup(popupTypeNewCard);
    clearValidation(formNewCard, validationConfig);
};    
  
formNewCard.addEventListener('submit', handleCardSubmit);

function handleAvatarSubmit (evt) {
    evt.preventDefault();
    renderLoading(true);
    changeAvatar(avatarInput.value)
    .then((data) => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch(err => console.log(err))
    .finally(() => {
        renderLoading(false);
    })
    closePopup(popupTypeAvatar);
}

formAvatar.addEventListener('submit', handleAvatarSubmit);

enableValidation(validationConfig);

Promise.all([
    getProfileData(),
    renderCards()
])
.then(([data, cards]) => { 
    document.querySelector('.profile__title').textContent = data.name;
    document.querySelector('.profile__description').textContent = data.about;
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    userId = data._id;
    cards.forEach((card) => {
        placesList.append(createCard(card, { deleteCard, likeCard, handleImageClick }, userId));
    });
})
.catch(err => console.log(err))

function renderLoading(isLoading) {
    buttonSubmit.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};