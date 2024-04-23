import { 
  ORGANIZATIONS,
  PARTICIPANTS,
  ROLE,
  EMPLOYEES,
  POSITION
} from "./const.js";

export const createOrganizationsList = (data) => {
  const title = `<h2>${ORGANIZATIONS}:</h2>`;
  const list = data.reduce((acc, item) => {
    acc += `<li>${item}</li>`;
    return acc;
  }, '<ul>') + '</ul>';
  return title + '<div>' + list + '</div>';
};

const createParticipant = (data) => {
  let res = '<li>';
  if (!data.company) {
    return;
  }
  res += `<div><strong>${data.company}</strong></div>`;
  if (data.role) {
    res += `<div>${ROLE}: ${data.role}</div>`;
  }
  if (data.persons) {
    res += `<div>${EMPLOYEES}:</div>`;
    res += '<ul>';
    data.persons.forEach((person) => {
      res += '<li>';
      res += `<div>${person.name}</div>`;
      if (person.position) {
        res += `<div>${POSITION}: ${person.position}</div>`;
      }
      res += '</li>';
    });
    res += '</ul>';
  }
  res += '</li>';
  return res;
};

export const createParticipantsList = (data) => {
  const title = `<h2>${PARTICIPANTS}:</h2>`;
  const ul = data.reduce((acc, item) => {
    acc += createParticipant(item);
    return acc;
  }, '<ul>') + '</ul>';
  return title + '<div>' + ul + '</div>';
};