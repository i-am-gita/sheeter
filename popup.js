var values = [];
  
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

chrome.identity.getAuthToken({ 'interactive': true }, getToken);

   function getToken(token) {
     console.log('this is the token: ', token);
     localStorage.setItem('token', token)
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
    'https://sheets.googleapis.com/v4/spreadsheets/1BEvQELH-9K9N3URBmfZb0hI96T3LqhfLKcjfc8WG9OI/values/A1:D1',
      init)
      .then((response) => response.json())
      .then(function(data) {
        console.log(data)
      });
   }

   document.getElementById('generate').onclick = function() {

    
    let init = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      'contentType': 'json'
    };
    fetch(
      "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'",
        init)
        .then((response) => response.json())
        .then(function(data) {
          console.log(data);
          data.files.forEach(element => {
            this.values.push(element);
          });
          var select = document.createElement("select");
          select.name = "sheets";
          select.id = "sheets"
       
          for (const val of values)
          {
              var option = document.createElement("option");
              option.value = val.id;
              option.text = val.name;
              select.appendChild(option);
          }
       
          document.getElementById("container").appendChild(select);
        });

     }
 
   