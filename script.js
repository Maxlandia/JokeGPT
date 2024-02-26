
            //removes the old href from .tweet-btn if found any
            tweetBtn.removeAttribute ('href');
            //console log the error
            console.log(error);//grab a reference for HTML elements .joke-text
// .joke-text
const jokeText=
document.querySelector ('.joke-text');
//.new-joke-btn
const newJokeBtn=
document.querySelector('.new-joke-btn');
//.tweet-btn (link)
const tweetBtn = 
document.querySelector ('.tweet-btn');

//add 'click' eventListener to .new-joke-btn
newJokeBtn.addEventListener ('click', getJoke);

//immediately call get joke ()
getJoke();

//getJoke() function definition
function getJoke() { //make an API request to https://icanhazdadjoke.com/'
    fetch ('https://icanhazdadjoke.com/',{
        headers: {
            'Accept': 'application/json'
        }
            
        }).then (function(response) 
        {
            /*convert Stringified JSON response to javascript Object */
        return response.json();
            
        }).then (function(data)
        {
        // replace inner text of .joke-text with data.joke
                     //extract the joke text
            const joke = data.joke;
            //do the replacement
            jokeText.innerText= joke;
            /*make the tweetBtn(.tweet-btn link) work by setting href*/
       //   create tweet link with joke
            const tweetLink = 'https://twitter.com/share?text=$';
            //set the href
         tweetBtn.setAttribute('href', tweetLink)
        }).catch (function(error){
            //if some error occurred 
            jokeText.innerText= 'Oops! Some error happened :(';
        });
    }

    function changeTheme() {
        const themeDropdown = document.getElementById("themeDropdown");
        const selectedTheme = themeDropdown.value;
      
        if (selectedTheme === "dark") {
          document.body.style.backgroundColor = "#333";
          document.body.style.color = "black";
        } 
        if (selectedTheme === "light"){
          document.body.style.backgroundColor = "#fff";
          document.body.style.color = "#000";
        }
        if (selectedTheme === "default"){
          document.body.style.backgroundColor - "blue";
          document.body.style.color = "black";
        }

      }
      
      
    
    
        
        
