const accessKey = "WpgGHdflnJUv-ChLoCnuvyVPeF_xXwk5-lYiquYhQr4";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchresults = document.getElementById("search-input");
const searchResuls = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputE1.value; // Use inputE1.value instead of inputE1.Value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    const results = data.results;
    if (page === 1) {
        searchResuls.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description; // Use textContent for link text
        
        imageLink.appendChild(image); // Append image to link
        imageWrapper.appendChild(imageLink); // Append link to wrapper
        searchResuls.appendChild(imageWrapper);
    });
    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
