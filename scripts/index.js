// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list'); 

function createCard() {
    const cardTemplate = document.querySelector('#card-template').content;
    
    initialCards.forEach((place) => {
        const card = cardTemplate.querySelector('.card').cloneNode(true);
     
        card.querySelector('.card__image').src = place.link;
        card.querySelector('.card__title').textContent = place.name;
        card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
        
        function deleteCard() {
            card.remove(); 
        }

        placesList.append(card);
    });

    return;
}

createCard();
   
