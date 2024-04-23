import './styles.scss';

const main = () => {

  const menu = document.querySelector('.menu');
  if (!menu) {
    return;
  }
  menu.addEventListener('click', menuClickHandler);

  function handleButtonClick(target) {
    const targetContainer = target.closest('.menu-item__title');
    targetContainer.nextElementSibling.classList.toggle('show');
  };

  function menuClickHandler(e) {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('menu-item__submenu-button')) {
      handleButtonClick(target);
    }
  };
};

document.addEventListener('DOMContentLoaded', main);