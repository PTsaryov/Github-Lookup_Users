// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
const searchBox = document.getElementById('searcinput');



function getUsers() {
  fetch(
    'https://api.github.com/search/users?state:open&order=asc&q=' + searchBox.value,
    {
      headers: { Accept: 'application/vnd.github.v3+json' }
    }
  ).then(response =>
    response.json()
      .then(data => {
        const userData = data.items.map(user => ({
          Name: `${user.login}`,
          Avatar: `${user.avatar_url}`,
          Page_Url: `${user.html_url}`
        }))}
      )
      .then(userData => {
        app.innerHTML = ``;

      }
      )
  );
}
