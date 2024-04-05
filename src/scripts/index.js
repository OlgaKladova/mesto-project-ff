import '../pages/index.css';
import {initialCards} from './cards';
import {createCard, deleteCard, likeCard} from './card';
import {openPopup, closePopup, animatePopup} from './modal';
const placesList = document.querySelector('.places__list'); 
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button'); 
const popups = document.querySelectorAll('.popup');
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements.link;

function renderCards() {
    initialCards.forEach((place) => {
        const card = createCard(place, { deleteCard, likeCard, handleImageClick });    
        placesList.append(card);
    });
};

renderCards();

function handleImageClick (evt) {
    const popupTypeImage = document.querySelector('.popup_type_image'); 
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');
    if (evt.target.classList.contains('card__image')) {
        openPopup(popupTypeImage);
    }
    popupImage.src = evt.target.getAttribute('src');
    popupImage.alt = evt.target.getAttribute('alt');
    popupCaption.textContent = evt.target.getAttribute('alt');
};

animatePopup(popups);

popups.forEach((popup) => {  
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
        if(evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});

buttonEdit.addEventListener('click', () => {
    const popupEdit = document.querySelector('.popup_type_edit');
    openPopup(popupEdit);
    nameInput.value = `${document.querySelector('.profile__title').textContent}`;
    jobInput.value = `${document.querySelector('.profile__description').textContent}`;
});

buttonAdd.addEventListener('click', () => {
    const popupNewCard = document.querySelector('.popup_type_new-card');
    openPopup(popupNewCard);
});

function handleFormSubmit(evt) {
    evt.preventDefault();   
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;   
    closePopup(document.querySelector('.popup_is-opened')); 
};

formElement.addEventListener('submit', handleFormSubmit);

function handleCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: placeInput.value,
        link: linkInput.value
    };
    placesList.prepend(createCard(newCard, { deleteCard, likeCard, handleImageClick })); 
    placeInput.value = '';
    linkInput.value = '';
    closePopup(document.querySelector('.popup_is-opened'));
};    
  
formNewCard.addEventListener('submit', handleCardSubmit);