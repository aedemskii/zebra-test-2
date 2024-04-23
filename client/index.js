import './styles.scss';
import { requestData } from './services.js';
import { createOrganizationsList, createParticipantsList } from './utils.js';

const main = () => {
  const organizations = document.getElementById('organizations');
  const participants = document.getElementById('participants');
  const initPath = window.location.pathname;
  requestData(initPath, renderData, renderError);

  const menu = document.querySelector('.menu');
  if (!menu) {
    return;
  }
  menu.addEventListener('click', menuClickHandler);

  function renderData(data) {
    organizations.innerHTML = createOrganizationsList(data.organizations);
    participants.innerHTML = createParticipantsList(data.participants);
  }

  function renderError() {
    organizations.innerHTML = 'Ошибка при загрузке данных';
    participants.innerHTML = '';
  }

  function  handleLinkClick(target) {
    const href = target.getAttribute('href');
    window.history.pushState({}, '', href);
    requestData(href, renderData, renderError);
  };

  function handleButtonClick(target) {
    const targetContainer = target.closest('.menu-item__title');
    targetContainer.nextElementSibling.classList.toggle('show');
  };

  function menuClickHandler(e) {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('menu-item__link')) {
      handleLinkClick(target);
    } else if (target.classList.contains('menu-item__submenu-button')) {
      handleButtonClick(target);
    }
  };
};

document.addEventListener('DOMContentLoaded', main);