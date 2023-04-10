let api_key = "AIzaSyBW5RfLRW_MxAZI4bYGoY5Z1eOHIcgCU9w";
// get url and plays embed
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const vidId = urlParams.get('v');
console.log("https://www.youtube.com/embed/" + vidId);
// Create element:
const iframe = document.createElement("iframe");
iframe.src = 'https://www.youtube.com/embed/' + vidId;
iframe.width ="720px";
iframe.height = "405px"
iframe.allow="fullscreen"
// Append to body:
document.body.appendChild(iframe);
// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "results.html?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})
// gets video title
$.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + vidId + "&key=" + api_key, function(data) {
  console.log(data.items[0].snippet.title);
  let vidIdTitle = data.items[0].snippet.title;
});

const h3 = document.createElement("h3");
h3.innerText = vidIdTitle;
document.body.appendChild(h3);