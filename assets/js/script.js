var introEl = document.querySelector("#intro-section");
var navEl = document.querySelector("#navigation");
var favoriteEl = document.querySelector("#favorite-section");
var nasaEL = document.querySelector("#nasa-photo");
var navHome = document.querySelector("#home");
var navFave = document.querySelector("#favorite");
<<<<<<< HEAD
var backBtn = document.getElementById("back-button");
var favBtn = document.getElementById("favorite-button");

// share button
//once we deploy this webiste I will update this link to the url of the webpage. then it should work, does not work bc we are using a local drive
const link = encodeURI(document.location.href);
const msg = encodeURIComponent('Hey, I found this article');
const title = encodeURIComponent(document.querySelector('title').textContent);
console.log([link,msg,title])
// share button
=======
var userName = document.querySelector("#user-name");

var nameInput =[];
>>>>>>> 7f6ebbf76f1219b068286e3e4608d2f901ba8d6f

function getName() {
    
}

// Spotify API
window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        uri: 'spotify:playlist:37i9dQZF1DX1qNZsqIInBz'
    };
    const callback = (EmbedController) => {
    };
    IFrameAPI.createController(element, options, callback);
  };



// navigation link functions
function goHome() {
    nasaEL.classList.add("hide");
    favoriteEl.classList.add("hide");
    navEl.classList.add("hide");
    introEl.removeAttribute("class");

}
function goFave() {
    nasaEL.classList.add("hide");
    introEl.classList.add("hide");
    navEl.removeAttribute("class");
    favoriteEl.removeAttribute("class");
}
// nasa photo function
function nasaRequested() {
    const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
<<<<<<< HEAD
   const apiKey = "yShsdvh8qlORqHHmWnX0W06kEaFtwLZorMqa9L75";
   const dateInput = document.querySelector("#datepicker");
   const title = document.querySelector("#title");
   const copyright = document.querySelector("#copyright");
   const mediaSection = document.querySelector("#media-section");
   const information = document.querySelector("#description");
   const play = document.querySelector("#play");

   window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        uri: 'spotify:playlist:37i9dQZF1DX1qNZsqIInBz'
    };
    const callback = (EmbedController) => {
    };
    IFrameAPI.createController(element, options, callback);
  };
=======
    const apiKey = "yShsdvh8qlORqHHmWnX0W06kEaFtwLZorMqa9L75";
    const dateInput = document.querySelector("#datepicker");
    const title = document.querySelector("#title");
    const copyright = document.querySelector("#copyright");
    const mediaSection = document.querySelector("#media-section");
    const information = document.querySelector("#description");
>>>>>>> develop

    const currentDate = new Date().toISOString().slice(0, 10);


    const imageSection = `<a id="hdimg" href="" target="-blank">
    <div class="image-div">
    <img id="image_of_the_day" src="" alt="image-by-nasa">
    </div>
   </a>`

    const videoSection = `<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`

    let newDate = "&date=" + dateInput.value + "&";


    function fetchData() {
        try {
            fetch(baseUrl + apiKey + newDate)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    displayData(json)
                })
        } catch (error) {
            console.log(error)
        }
    }

    function displayData(data) {

        title.innerHTML = data.title;

        if (data.hasOwnProperty("copyright")) {
            copyright.innerHTML = data.copyright;
        } else {
            copyright.innerHTML = ""
        }

        date.innerHTML = data.date;
        dateInput.max = currentDate;
        dateInput.min = "1995-06-16";

        if (data.media_type == "video") {
            mediaSection.innerHTML = videoSection;
            document.getElementById("videoLink").src = data.url;

        } else {
            mediaSection.innerHTML = imageSection;
            document.getElementById("hdimg").href = data.hdurl;
            document.getElementById("image_of_the_day").src = data.url;
        }
        information.innerHTML = data.explanation
    }
    fetchData();
}
// Function to check if the footer should be visible or not
function footerVisibility() {
    var footer = document.getElementById('rights-container');
    var bodyHeight = document.body.scrollHeight;
    var windowHeight = window.innerHeight;
    var scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    // If the user has scrolled to the bottom of the page or there's no need to scroll, show the footer
    if (scrollPosition + windowHeight >= bodyHeight || bodyHeight <= windowHeight) {
        footer.style.display = 'block';
    } else {
        // Otherwise, hide the footer
        footer.style.display = 'none';
    }
}


// Event Listener for navigation links
navHome.addEventListener("click", goHome);
navFave.addEventListener("click", goFave);
// Event listener for scroll, resize, and popstate events
window.addEventListener('scroll', footerVisibility);
window.addEventListener('resize', footerVisibility);
window.addEventListener('popstate', footerVisibility);
// date picker event listener
const dateInput = document.querySelector("#datepicker");
dateInput.addEventListener('change', (e) => {
    e.preventDefault();
    nasaRequested();
    // page elements are hidden upon fetching Nasa Photo of the Day.
    introEl.classList.add("hide");
    navEl.removeAttribute("class");
    nasaEL.removeAttribute("class");
})
<<<<<<< HEAD


nasaRequested();


// go back button function 

function goBack (){
    goHome()
}

backBtn.addEventListener("click", goBack);

//share link

const fb = document.querySelector('.facebook');
fb.href = `https://www.facebook.com/sharer/sharer.php?u=${link}`;

const twitter = document.querySelector('.twitter');
twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

const linkedIn = document.querySelector('.linkedin');
linkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;

const reddit = document.querySelector('.reddit');
reddit.href = `http://www.reddit.com/submit?url=${link}&title=${title}`;

const whatsapp = document.querySelector('.whatsapp');
whatsapp.href = `https://api.whatsapp.com/send?text=${msg}: ${link}`;

const telegram = document.querySelector('.telegram');
telegram.href = `https://telegram.me/share/url?url=${link}&text=${msg}`;

// local storage for favorite page

let resultsArray = [];
let favorites = {};

function saveFavPhoto(){
    var favPhoto = {
        photoLink: object.url,
    }
        localStorage.setItem("saveFavPhoto",JSON.stringify(favPhoto))
        console.log(favPhoto)
    }

// function updateDOM(page) {
//     // Get Favorites from localStorage
//     if (localStorage.setItem('url')) {
//         favorites = JSON.parse(localStorage.getItem('url'));
//     }
    
//     goFave(page)
    
// }

// function saveFavorite(url) {
//     // Loop through Results Array to select Favorite
//     resultsArray.forEach((object) => {
//         if (item.url.includes(url) && !favorites[object.url]) {
//             favorites[url] = item;
//             // Show Save Confirmation for 2 Seconds
//             saveConfirmed.hidden = false;
//             setTimeout(() => {
//                 saveConfirmed.hidden = true;
//             }, 2000);
//             // Set Favorites in Local Storage
//             localStorage.setItem('url', JSON.stringify(favorites));
//         }
//     });
// }

// function removeFavorite(url) {
//     if (favorites[url]) {
//         delete favorites[url];
//         // Set Favorites in Local Storage
//         localStorage.setItem('url', JSON.stringify(favorites));
//         updateDOM('url');
//     }
// }

favBtn.addEventListener("click", saveFavPhoto);
=======
>>>>>>> 7f6ebbf76f1219b068286e3e4608d2f901ba8d6f
