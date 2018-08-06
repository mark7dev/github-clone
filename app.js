var request = superagent;
var form = document.querySelector('.navigation__search'); //FORM
var input = document.querySelector('.navigation__search input'); //INPUT
// var userInput = ""; //USER GITHUB CATCH

var apiProfile = 'https://api.github.com/users/'; //+ userInput + token
var repos = '/repos';
var token = '?access_token=';

form.addEventListener('submit', function(event){
    event.preventDefault();
    var userInput = input.value;

    function getDataSidebar(response){
        var photo = response.body.avatar_url;
        var name = response.body.name;
        var login = response.body.login;
        var workplace = response.body.company;
        var location = response.body.location;
        var email = response.body.email;
        var web = response.body.site_admin;

        return [photo, name, login, workplace, location, email, web];
    }

    function createSetElemetsSidebar(data){
        var img = document.querySelector('.sidebar__photo img');
        var name = document.querySelector('.sidebar__user__current-name');
        var username = document.querySelector('.sidebar__user__user-github');
        var workplace = document.querySelector('.sidebar__workplace');
        var location = document.querySelector('.sidebar__residence');
        var email = document.querySelector('.sidebar__email');
        var web = document.querySelector('.sidebar__web');

        //SETTING VALUES
        img.src = data[0];
        name.textContent = data[1];
        username.textContent = data[2];
        workplace.textContent = data[3];
        location.textContent = data[4];
        email.textContent = data[5];
        web.textContent = data[6];
    }

    function createRepos(name, description, language, size, date){
        var repos = document.querySelector('.repos');

        //CREATE ELEMENTS
        var article = document.createElement('article');
        var h3 = document.createElement('h3');
        var p = document.createElement('p');
        var div = document.createElement('div');
        var lang = document.createElement('p');
        var commits = document.createElement('p');
        var createDate = document.createElement('p');

        //SETTING CLASSES
        article.className = 'repos__single';
        h3.className = 'repos__single__title';
        p.className = 'repos__single__description';
        div.className = 'repos__single__details';
        lang.className = 'repos__single__details__language';
        commits.className = 'repos__single__details__commits';
        createDate.className = 'repos__single__details__date';

        //SETTING VALUES
        h3.textContent = name;
        p.textContent = description;
        lang.textContent = language;
        commits.textContent = size;
        createDate.textContent = date;

        //APPEND CHILDS
        repos.appendChild(article);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(div);
        div.appendChild(lang);
        div.appendChild(commits);
        div.appendChild(createDate);
    }

    //PROFILE REQUEST - SIDEBAR
    request
        .get(apiProfile+userInput+token)
        .then(getDataSidebar)
        .then(createSetElemetsSidebar);
    
    //REPOS REQUEST - MAIN CONTAINER    
    request
    .get(apiProfile+userInput+repos+token)
    .then(function(response){
        var repos = response.body;
        document.querySelector('.repos').innerHTML = "";
        repos.forEach(function(repo){

            var name = repo.name;
            var description = repo.description;
            var language = repo.language;
            var size = repo.size;
            var date = repo.created_at;

            createRepos(name, description, language, size, date);
        })
    });    
})
