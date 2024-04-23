export const requestData = (href, callback, callbackError) => {
  if (href === '/') {
    return;
  }
  fetch('/api/' + href)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error(error);
      callbackError();
    });
};