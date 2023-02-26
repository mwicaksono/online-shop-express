const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
const mobileMenu = document.querySelector('#mobile-menu');

const showMobileMenu = () => {
    // if
    // if (mobileMenu.style.display === 'none') {
    //     mobileMenu.style.display = 'block';
    // } else {
    //     mobileMenu.style.display = 'none';
    // }
    mobileMenu.classList.toggle('open');
    // ternary 
    // mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
}

mobileMenuBtn.addEventListener('click', showMobileMenu);