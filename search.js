const videoCardContainer = document.querySelector('.video-container');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('search_query');
let api_key = "AIzaSyAe-TVdpD8kck_LmkKlSJzFnGJOb2EmLrE";
let video_http = "https://www.googleapis.com/youtube/v3/search?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
// alert("https://youtube.googleapis.com/youtube/v3/search?q=" + search + "&key=" + api_key + "&part=snippet&maxResults=20&regionCode=PH")
// alert(videoCardContainer)
fetch(video_http + new URLSearchParams({
	q: search,
    key: api_key,
    part: 'snippet',
    maxResults: 50,
    regionCode: 'PH'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'watch.html?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name" onclick="location.href = 'results.html?search_query='${data.snippet.channelTitle}'">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "results.html?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})


