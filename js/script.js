// import * as basicLightbox from "basiclightbox";
import {
  timerID,
  inputValue,
  input,
  searchBtn,
  mainContainer,
  loadMoreBtn,
} from "./refs.js";
let page = 1;
let perPage = 24;
const params = new URLSearchParams({
  limit: perPage,
  page: page,
});

let url = `https://api.jikan.moe/v4/anime?${params}`;

//Показывает все карточки изначально на странице
animeFetcher(drawSmallCard, url);

//Вызов на сервер для получения инф про аниме, вкладывается ф-я по структуре карточек и ссылка на вызов как параметры
function animeFetcher(func, link) {
  fetch(link)
    .then((response) => response.json())
    .then((result) => {
      createCards(result.data, func);
    })
    .catch((error) => console.log("Error:", error));
}

//Получает результат вызова на сервер(animeData) и имеет в себе перебор. а потом создание карточек аниме(foo)
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

//Создает структуру маленьких карточек аниме
function drawSmallCard(anime) {
  const { title, images, mal_id } = anime;
  const smallImageUrl = images.jpg.large_image_url;

  let smallAnimeCard = `
  <div class="anime-card" data-anime-id="${mal_id}">
  <img class="anime-image-small" src="${smallImageUrl}" alt="${title}" width="220" height="300"/>
  <h3 class="anime-small-heading">${title}</h3>
  </div>
  `;
  mainContainer.insertAdjacentHTML("beforeend", smallAnimeCard);
}

const openBigCard = (e) => {
  e.preventDefault();

  const animeCard = e.target.closest(".anime-card");
  if (!animeCard) {
    return;
  }
  const animeId = animeCard.dataset.animeId;

  url = `https://api.jikan.moe/v4/anime/${animeId}`;

  const instance = basicLightbox(animeFetcher(drawBigCard, url));
};

mainContainer.addEventListener("click", openBigCard);
//
//
//
//
//
//Загружает больше карточек аниме
loadMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animeFetcher(drawSmallAnimeCard, url);
});
//
//
//
//Совершает поиск по вводу имени аниме
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
function drawBigCard(anime) {
  const { title, synopsis, year, rating, genres, studios, images } = anime;
  const bigImageUrl = images.jpg.large_image_url;

  let bigAnimeCard = `
  <div class="modal">
  <button data-modal-close class="btn-modal" type="button">
        </button>
  <img class="anime-image-big" src="${bigImageUrl}" alt="${title}" width="" height=""/>
  <div>
  <h3 class="title">Title: ${title}</h3>
  <h3 class="rating">Rating: ${rating}</h3>
  <h3 class="year">Year: ${year}</h3>
  <h3 class="studios">Studios: ${studios}</h3>
  <h3 class="genre">Genre: ${genres}</h3>
  </div>
  <p class="synopsis">${synopsis}</p>

  </div>
  `;

  modalBackdrop.insertAdjacentHTML("beforeend", bigAnimeCard);
}
