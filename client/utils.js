const createStringList = (data) => {
  return data.reduce((acc, item) => {
    acc += `<li>${item}</li>`;
    return acc;
  }, '<ul>') + '</ul>';
};

export const createOrganizationsList = (data) => {
  const title = '<h2>Организации:</h2>';
  const ul = createStringList(data);
  return title + ul;
};

const createObjectList = (data) => {
  let res = '<div>';

  data.forEach((obj) => {
    let htmlContent = '<ul>';
    Object.keys(obj).forEach((key) => {
      if (obj[key] instanceof Array) {
        htmlContent += createObjectList(obj[key]);
        return;
      } else {
        htmlContent += `<li><strong>${key}:</strong> ${obj[key]}</li>`;
      }
    });
    htmlContent += '</ul>';

    res += htmlContent;
  });

  return res + '</div>';
};

export const createParticipantsList = (data) => {
  const title = '<h2>Участники:</h2>';
  const ul = createObjectList(data);
  return title + ul;
};