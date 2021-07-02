
function catchUser(){

let users = []

let apUsers_url = 'https://jsonplaceholder.typicode.com/users'
let apPosts_url = 'https://jsonplaceholder.typicode.com/posts'


const postDisplay = document.querySelector('.postDisplay');


// Function to add Users to Table
const tableCreate = (user) => {
    const tableUser = document.querySelector('tbody');

    let section = document.createElement('tr');
    let userSection = document.createElement('td');

    userSection.innerHTML += user.name;

    let buttonSection = document.createElement('td');
    let openButton = document.createElement('button');
    let closeButton = document.createElement('button');

    closeButton.innerHTML= "Close";
    closeButton.id = user.id;
    closeButton.classList = "posts"

    openButton.innerHTML = "Open";
    openButton.id = user.id;
    openButton.classList = "posts";
    
    buttonSection.appendChild(openButton)
    buttonSection.appendChild(closeButton)


    section.appendChild(userSection);
    section.appendChild(buttonSection);
    tableUser.appendChild(section);

}

// Get Users from API and store the name and ID in users
const getUsers = async url => {
    // Get API User Data
    let response = await fetch(url)
    const res = await response.json();
    
    // Putting Needed Data into an Array
    for (i=0; i <res.length; i++){
        const {id , name} = res[i];
        users.push({id , name});
    }

    for (i=0; i < users.length; i++){
        tableCreate(users[i])
    }

    eventButtonlistener()
}

// Function to display Posts
const postsShow = (post) => {

    let postWrapper = document.createElement('div');
    let title = document.createElement('h2');
    let body = document.createElement('p');
    let postNumber = document.createElement('h1')

    postNumber.innerHTML = post.id;
    postWrapper.classList = "postWrapper";
    title.innerHTML = post.title;
    body.innerHTML = post.body;

    postWrapper.appendChild(postNumber);
    postWrapper.appendChild(title);
    postWrapper.appendChild(body);
    postDisplay.appendChild(postWrapper);

}

//Make function to get posts from user ID
const getPosts = async (id) =>{

    if (postDisplay.childNodes.length > 3) { 
    }else{

    let response = await fetch(apPosts_url)
    const res = await response.json();

    // Array of Posts by Target ID
    let postsFromUser = res.filter(city => city.userId == parseInt(id));

    for (let i = 0; i < postsFromUser.length; i++) {
        postsShow(postsFromUser[i]);
      }
    }
}

//Make function to close posts from user ID
const closePosts = () =>{

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }


    removeAllChildNodes(postDisplay);


}

//Add Event listener to buttons
const eventButtonlistener = () =>{
    document.querySelectorAll('.posts').forEach(item => {
        if (item.innerHTML == "Open"){
            item.addEventListener('click', event => {
                getPosts(event.target.id);})
        }
        else{
            item.addEventListener('click', event => {
                closePosts();
            })
        }
    })
}




getUsers(apUsers_url)

}catchUser()

