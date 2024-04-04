function createCard(item, { deleteCard, likeCard, handleImageClick }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');  
    const cardTitle = cardElement.querySelector('.card__title');
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    const buttonLike = cardElement.querySelector('.card__like-button');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    buttonDelete.addEventListener('click', deleteCard);
    buttonLike.addEventListener('click', likeCard);      
    cardImage.addEventListener('click', handleImageClick);
    
    return cardElement;
};

function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

export {createCard, deleteCard, likeCard};