import {
  input,
  searchBtn,
  mainContainer,
  loadMoreBtn,
  select,
} from "./refs.js";
import { openBigCard } from "./big-card-shower.js";
import { fetchGenres, fetcher } from "./fetch.js";

let timerID, inputValue;
let page = 1;
let perPage = 24;
const params = new URLSearchParams({
  limit: perPage,
  page: page,
});

let url = `https://api.jikan.moe/v4/anime`;

//Показывает все карточки изначально на странице
animeFetcher(drawSmallCard, url);

//Вызов на сервер для получения инф про аниме, вкладывается ф-я по структуре карточек и ссылка на вызов как параметры
function animeFetcher(func, link) {
  fetch(link)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result.data);
      // createCards(result.data, func);
    })
    .catch((error) => console.log("Error:", error));
}

//Получает результат вызова на сервер(animeData) и имеет в себе перебор. а потом создание карточек аниме(foo)
function createCards(animeData, foo) {
  if (animeData.length === 0) {
    mainContainer.innerHTML = `<h2 class="nothing-heading">Nothing was found</h2>`;
    loadMoreBtn.classList.replace("load-more-btn", "not-visible");
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
  let { title, images, mal_id } = anime;
  const smallImageUrl = images.jpg.large_image_url;

  let smallAnimeCard = `
  <div class="anime-card" data-anime-id="${mal_id}">
  <img class="anime-image-small" src="${smallImageUrl}" alt="${title}" />
  <h3 class="anime-small-heading">${title}</h3>
  </div>
  `;
  mainContainer.insertAdjacentHTML("beforeend", smallAnimeCard);
}

mainContainer.addEventListener("click", openBigCard);
//
//
//
//
//
//Загружает больше карточек аниме
loadMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animeFetcher(drawSmallCard, url);
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
      animeFetcher(drawSmallCard, url);
    }
  }, 1000);
});
//
//
fetchGenres((url = "https://api.jikan.moe/v4/genres/anime"));

// function fetchAnimeByGenre(genre) {
//   fetch((url = `https://api.jikan.moe/v4/anime`))
//     .then((response) => response.json())
//     .then((result) => {
//       const allAnimeData = result.data;
//       console.log(allAnimeData);
//       const filteredAnime = allAnimeData.filter((anime) => {
//         return anime.genres.includes(genre);
//       });
//       console.log(filteredAnime);
//     })
//     .catch((error) => console.log("Error:", error));
//   // createCards(filteredAnime, drawSmallCard);
// }

// select.addEventListener("change", (e) => {
//   let genreValue = e.currentTarget.value;
//   // console.log(genreValue);
//   fetchAnimeByGenre(genreValue);
// });

//
//
//
//
//
//
