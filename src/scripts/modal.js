function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClick);
};   

function closePopup (popupElement) {        
    popupElement.classList.remove('popup_is-opened');  
    document.removeEventListener('keydown', handleEscClick);
};

function handleEscClick(evt) {
    if(evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}; 

function animatePopup(popupsCollection) {
    popupsCollection.forEach((popup) => {   
        if(!popup.classList.contains('popup_is-opened')) {
            popup.classList.add('popup_is-animated');
        }
    });
};

export {openPopup, closePopup, animatePopup};