// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list'); 

function createCard(item, { deleteCard }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');  
    const cardTitle = cardElement.querySelector('.card__title');
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    buttonDelete.addEventListener('click', deleteCard);
            
    return cardElement;
}

function renderCards() {
    initialCards.forEach((place) => {
        const card = createCard(place, { deleteCard });    
        placesList.append(card);
    });
}

renderCards();

function deleteCard(event) {
    event.target.closest('.card').remove();
}
