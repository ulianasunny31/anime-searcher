const input = document.querySelector(".search-inp");
const searchBtn = document.querySelector(".search-btn");
const mainContainer = document.querySelector(".main-container");
const loadMoreBtn = document.querySelector("#load-more-btn");
let timerID, inputValue;
let page = 1;
let perPage = 24;
const params = new URLSearchParams({
  limit: perPage,
  page: page,
});

let url = `https://api.jikan.moe/v4/anime?${params}`;
// const { title, synopsis, year, rating, genres, studios, image_url } = anime;

function animeFetcher(func, link) {
  fetch(link)
    .then((response) => response.json())
    .then((result) => {
      createCards(result.data, func);
    })
    .catch((error) => console.log("Error:", error));
}

function createCards(animeData, foo) {
  if (animeData.length === 0) {
    mainContainer.innerHTML = `<h2 class="nothing-heading">Nothing was found</h2>`;
  } else {
    animeData.forEach((anime) => {
      foo(anime);
    });
    if (animeData.length >= 24) {
      loadMoreBtn.classList.replace("not-visible", "load-more-btn");
    } else {
      loadMoreBtn.classList.replace("load-more-btn", "not-visible");
    }
    page += 1;
  }
}

animeFetcher(drawSmallAnimeCard, url);

loadMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animeFetcher(drawSmallAnimeCard, url);
});

function drawSmallAnimeCard(anime) {
  const { title, images } = anime;
  const smallImageUrl = images.jpg.large_image_url;

  let smallAnimeCard = `
  <div class="anime-card">
  <img class="anime-image-small" src="${smallImageUrl}" alt="${title}" width="220" height="300"/>
  <h3 class="anime-small-heading">${title}</h3>
  </div>
  `;
  mainContainer.insertAdjacentHTML("beforeend", smallAnimeCard);
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  clearTimeout(timerID);
  timerID = setTimeout(function () {
    inputValue = input.value.trim();
    url = `https://api.jikan.moe/v4/anime?${params}&q=${inputValue}`;
    if (inputValue !== "") {
      page = 1;
      mainContainer.innerHTML = "";
      animeFetcher(drawSmallAnimeCard, url);
    }
  }, 1000);
});
