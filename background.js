chrome.identity.getAuthToken({ 'interactive': true }, getToken);

   function getToken(token) {
     console.log('this is the token: ', token);
  let init = {
    method: 'GET',
    async: true,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    'contentType': 'json'
  };
  fetch(
    'https://sheets.googleapis.com/v4/spreadsheets/1BEvQELH-9K9N3URBmfZb0hI96T3LqhfLKcjfc8WG9OI/values/10',
      init)
      .then((response) => response.json())
      .then(function(data) {
        console.log(data)
      });
   }