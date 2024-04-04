import '../pages/index.css';
import {initialCards} from './cards';
import {createCard, deleteCard, likeCard} from './card';
import {openPopup, closePopup, handleEscClick, animatePopup} from './modal';
const placesList = document.querySelector('.places__list'); 
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button'); 
const pageContent = document. querySelector('.page__content');
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
    
function animatePopup() {
    const animation = pageContent.children;
    for(let i = 0; i < animation.length; i++) {
        if(animation[i].classList.contains('popup')) {
            animation[i].classList.add('popup_is-animated');
        }
    };
};

animatePopup();

pageContent.addEventListener('click', (evt) => {
    const popupContent = document.querySelectorAll('.popup__content');
    if(evt.target.classList.contains('popup__close')) {
        closePopup(evt.target);
        nameInput.value = '';
        jobInput.value = '';
    }
    if(evt.target !== popupContent && evt.target.classList.contains('popup')) {
        evt.target.classList.remove('popup_is-opened');
    }
    if(evt.target.classList.contains('popup__button')) {
        closePopup(evt.target);
    }
});

document.addEventListener('keydown', handleEscClick);

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
};    
  
formNewCard.addEventListener('submit', handleCardSubmit);