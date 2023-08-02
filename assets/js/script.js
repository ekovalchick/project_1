var introEl = document.querySelector("#intro-section");
var navEl = document.querySelector("#navigation");
var favoriteEl = document.querySelector("#favorite-section");
var nasaEL = document.querySelector("#nasa-photo");
var navHome = document.querySelector("#home");
var navFave = document.querySelector("#favorite");
var userName = document.querySelector("#user-name");
var nameEl = document.querySelectorAll(".name");
var favoriteBtn = document.querySelector("#favorite-button");
var favContainerEl = document.querySelector(".fav-container");


var users = [];

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
    introEl.classList.remove("hide");

}
function goFave() {
    nasaEL.classList.add("hide");
    introEl.classList.add("hide");
    navEl.removeAttribute("class");
    favoriteEl.classList.remove("hide");
    getFields();
}
// nasa photo function
function nasaRequested() {
    const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
    const apiKey = "yShsdvh8qlORqHHmWnX0W06kEaFtwLZorMqa9L75";
    const dateInput = document.querySelector("#datepicker");
    const title = document.querySelector("#title");
    const copyright = document.querySelector("#copyright");
    const mediaSection = document.querySelector("#media-section");
    const information = document.querySelector("#description");
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
                    localStorage.setItem("json", JSON.stringify(json))
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
// Function to save NASA photos to Favorites
function saveFavorite() {
    var json = JSON.parse(localStorage.getItem("json"));
    if (localStorage.getItem(users)) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    users.push({
        user: userName.value,
        date: json.date,
        url: json.url,
        description: json.explanation,
        title: json.title
    })
    localStorage.setItem("users", JSON.stringify(users));
}

// Elizabeth's logic for the favorite's page
function getFields(pullTheArray) {
    var pullTheArray = JSON.parse(localStorage.getItem("users"));
    console.log(pullTheArray[0])
    for (var i = 0; i < pullTheArray.length; i++) {
        //     <section class="card" onmouseover="showInfo()" onmouseout="hideInfo()">
        //     <img src="#nasa-photo" alt="Image">
        //     <section class="info">
        //         <h2>Card Title</h2>
        //         <p>Dynamic information goes here...</p>
        //     </section>
        //     <button id="remove-button">Remove</button>
        // </section>
        var section = document.createElement("section")
        section.classList = "card"
        section.setAttribute("onmouseover", "showInfo()")
        section.setAttribute("onmouseout", "hideInfo()")
        var img = document.createElement("img")
        img.src = pullTheArray[i].url
        img.alt = "image"

        var section2 = document.createElement("section")
        section2.classList = "info"
        var h2 = document.createElement("h2")
        h2.textContent = pullTheArray[i].title
        var p = document.createElement("p")
        p.textContent = pullTheArray[i].description

        section2.appendChild(h2)
        section2.appendChild(p)

        section.appendChild(img)
        section.appendChild(section2)

        favContainerEl.appendChild(section)


    }

}


// Event Listener for navigation links
navHome.addEventListener("click", goHome);
navFave.addEventListener("click", goFave);
// Event listener for scroll, resize, and popstate events
window.addEventListener('scroll', footerVisibility);
window.addEventListener('resize', footerVisibility);
window.addEventListener('popstate', footerVisibility);

favoriteBtn.addEventListener("click", saveFavorite);
// name input event listener
userName.addEventListener('input', () => {
    var inputValue = userName.value;
    nameEl.forEach((label) => {
        label.textContent = inputValue;
    });
});
// date picker from NASA API
const dateInput = document.querySelector("#datepicker");
dateInput.addEventListener('change', (e) => {
    e.preventDefault();
    nasaRequested();
    // page elements are hidden upon fetching Nasa Photo of the Day.
    introEl.classList.add("hide");
    navEl.removeAttribute("class");
    nasaEL.removeAttribute("class");
})




