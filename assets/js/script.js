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

const dateInput = document.querySelector("#datepicker");
var introEl = document.querySelector("#intro-section");
var navEl = document.querySelector("#navigation");
var favoriteEl = document.querySelector("#favorite-section");
var nasaEL = document.querySelector("#nasa-photo");
dateInput.addEventListener('change', (e) => {
    e.preventDefault();
    nasaRequested();
    introEl.classList.add("hide");
    navEl.removeAttribute("class");
    nasaEL.removeAttribute("class");
})

nasaRequested()

/*
when nasaRequested,
intro-section hides,
nav bar displays

*/





