function openPopup(popup) {
    popup.classList.add('popup_is-opened');
};   

function closePopup (evt) {        
    evt.closest('.popup').classList.remove('popup_is-opened');  
};

function handleEscClick(evt) {
    if(evt.key === 'Escape') {
        document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    }
}; 

function animatePopup() {
    const popups = document.querySelectorAll('.popup');
    for(let i = 0; i < popups.length; i++) {
        if(!popups[i].classList.contains('popup_is-opened')) {
            popups[i].classList.add('popup_is-animated');
        }
    };
};


export {openPopup, closePopup, handleEscClick, animatePopup};