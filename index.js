// Import stylesheets
//import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
const searchBox = document.getElementById('searchinput');

var el = document.getElementById('searchbutton');
if (el) {
  el.addEventListener('click', getUsers);
}

function getUsers() {
  fetch(
    'https://api.github.com/search/users?state:open&order=asc&page=1&per_page=30&q=' +
      searchBox.value,
    {
      headers: { Accept: 'application/vnd.github.v3+json' }
    }
  ).then(
    response =>
      response.json().then(data => {
        //console.log(searchBox.value); //uncomment to see that value is being grabbed from the search box
        const userData = data.items.map(user => ({
          Name: `${user.login}`,
          Avatar: `${user.avatar_url}`,
          Page_Url: `${user.html_url}`
        }));
        var htmlString = '';

        userData.forEach(user => {
          const followers = fetch(
            'https://api.github.com/users/' + user.Name + '/followers', //this would give me problems as api search said "search limit exceeded", but it should work to get the list and the do a .length to get follower count
            {
              headers: { Accept: 'application/vnd.github.v3+json' }
              //}.then(response => response.json().then(fdata => fdata.items.map()))
            }
          );
          htmlString += `<li>
                            <a style = "text-decoration:none;" href="${
                              user.Page_Url
                            }">${user.Name}</a><br/>
                            <img src="${user.Avatar}" href="${
            user.Page_Url
          }"></img><br/>
                            <span>Follower Count: ${
                              followers.length
                            }</span><br/><br/>
                         </li>`;
        });
        showPagination();

        //This was my attempt to get total results for the search.

        // let totalResults = 0;
        // for (let i = 0; i < userData.length; i++) {
        //   if (userData[i].status === '0') totalResults++;
        // }

        appDiv.innerHTML =
          '<p>Results found: ' +
          data.total_count +
          '</p><ul style="list-style-type:none;">' +
          htmlString +
          '</ul>'; //JSON.stringify(userData); //I used this to make see the populated array of users
        //console.log(userData); //uncomment to see that the array is being populated with objects (users)
      })
    //.then(usererData => {})
  );
}

function showPagination() {
  var pgn = document.getElementById('paginationdiv');
  pgn.style.display = 'block';
}
