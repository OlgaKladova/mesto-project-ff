import {deleteCardFromServer, addLikeCardToServer, deleteLikeCardFromServer} from './api';

function createCard(item,  { deleteCard, likeCard, handleImageClick }, dataId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');  
    const cardTitle = cardElement.querySelector('.card__title');
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    const buttonLike = cardElement.querySelector('.card__like-button');
    const likeNumber = cardElement.querySelector('.card__like-number');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    likeNumber.textContent = item.likes.length;
    cardElement.id = item._id;
    item.likes.forEach((like) => {
        if(dataId === like._id) {
        buttonLike.classList.add('card__like-button_is-active');
        }
    });    
    buttonDelete.addEventListener('click', () => {
        deleteCard(cardElement);
    });
    buttonLike.addEventListener('click', () => {
        likeCard(cardElement, buttonLike, likeNumber);  
    });   
    cardImage.addEventListener('click', handleImageClick);
    if (dataId !== item.owner._id) {
        buttonDelete.disabled = true;
        buttonDelete.hidden = true;
    }
    return cardElement;
};

function deleteCard(card) {
    deleteCardFromServer(card.id)
    .catch(err => console.log(err))
    card.remove()
};

function likeCard(card, buttonLike, likeNumber) {
    if(buttonLike.classList.contains('card__like-button_is-active')) {
        deleteLikeCardFromServer (card.id) 
        .then((data) => {
            buttonLike.classList.remove('card__like-button_is-active');
            likeNumber.textContent = data.likes.length;
        })
        .catch(err => console.log(err))        
    } else {
        addLikeCardToServer(card.id)
        .then((data) => {
            buttonLike.classList.add('card__like-button_is-active');
            likeNumber.textContent = data.likes.length;
        })
        .catch(err => console.log(err))
    }
}


export {createCard, deleteCard, likeCard};