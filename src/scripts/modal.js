function openPopup(popup) {
    popup.classList.add('popup_is-opened');
};   
 
function closePopup (evt) {        
    evt.closest('.popup').classList.remove('popup_is-opened');  
};

function handleEscClick(popups, evt) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((element) => {
        if(evt.key === 'Escape' && element.classList.contains('popup_is-opened')) {
            element.classList.remove('popup_is-opened');
        }
    });
};

export {openPopup, closePopup, handleEscClick};