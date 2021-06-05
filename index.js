// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
const searchBox = document.getElementById('searchinput');

document.getElementById('searchbutton').addEventListener('mousedown', getUsers);

function getUsers() {
  fetch(
    'https://api.github.com/search/users?state:open&order=asc&q=' +
      searchBox.value,
    {
      headers: { Accept: 'application/vnd.github.v3+json' }
    }
  ).then(response =>
    response
      .json()
      .then(data => {
        //console.log(searchBox.value);  //uncomment to see that value is being grabbed from the search box
        const userData = data.items.map(user => ({
          Name: `${user.login}`,
          Avatar: `${user.avatar_url}`,
          Page_Url: `${user.html_url}`
        }));
        //console.log(userData); //uncomment to see that the array is being populated with objects (users)
      })
      .then(userData => {
        appDiv.innerHTML = data.ToString();
      })
  );
}
