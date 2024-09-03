const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResult = document.getElementById('result');
const showMore = document.getElementById('show-more');
const clear = document.getElementById('clear');
const size = document.getElementById('image-size');
const change = document.getElementById('change');
const resize = document.getElementById('resize');
const paragraph = document.getElementById('paragraph');

let accessKey = '5Y4SGhzQt5jhJ976WCFNtLQhf8N57qEH3R64Fguebjc';
let keyword = 'football';
let page = 1;

const fetchDefault = async () => {
    keyword = 'football';
    let API_URL = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    const results = await data.results;
    if (results) {
        results.map((result) => {
            let image = document.createElement('img');
            image.src = result.urls.small;
            searchResult.appendChild(image);
        })
    } else {
        const info = document.createElement('p');
        info.innerHTML = 'Loading Please wait';
        searchResult.appendChild(info);
    }
    paragraph.innerHTML = 'Sample Images'
}

setTimeout(fetchDefault, 1000);

async function fetchAPI() {
    keyword = searchInput.value || keyword;
    if (page === 1) {
        searchResult.innerHTML = ''
    }
    let API_URL = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data.results);

    const results = await data.results;
    if (results) {
        results.map((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small;
            searchResult.appendChild(image);
        })
    } else {
        const info = document.createElement('p');
        info.innerHTML = 'Loading Please wait';
        searchResult.appendChild(info);
    }
    paragraph.innerHTML = 'Images related to Search'
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    fetchAPI()
})

showMore.addEventListener('click', (e) => {
    e.preventDefault();
    page++;
    fetchAPI();
})

clear.addEventListener('click', () => {
    searchResult.innerHTML = '';
    searchInput.value = '';
    fetchDefault();
    paragraph.innerHTML = 'Sample Images';
})

change.addEventListener('click', () => {
    const allImages = searchResult.querySelectorAll('img');
    if (size.value > 0)
        if (size.value <= 1000) {
            const newSize = size.value || 300;
            allImages.forEach((item) => {
                item.style.width = `${newSize}px`;
            })
        } else {
            alert('Size must be Less than or equal to 1000')
        }
})

resize.addEventListener('click', () => {
    const allImages = searchResult.querySelectorAll('img');
    allImages.forEach((item) => {
        item.style.width = '300px';
        size.value = '';
    })
})

