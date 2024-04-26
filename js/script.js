import { input, searchBtn, mainContainer, loadMoreBtn } from "./refs.js";
let timerID, inputValue;
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
  <img class="anime-image-small" src="${smallImageUrl}" alt="${title}" />
  <h3 class="anime-small-heading">${title}</h3>
  </div>
  `;
  mainContainer.insertAdjacentHTML("beforeend", smallAnimeCard);
}

//При клике на картинку открывает большую карточку с информацией об аниме
const openBigCard = (e) => {
  e.preventDefault();
  let animeData;
  const animeCard = e.target.closest(".anime-card");

  //Проверяем нажали на карточку или нет
  if (!animeCard) {
    return;
  }
  //Получили Id конкретного аниме
  const animeId = animeCard.dataset.animeId;

  //Получаем это аниме и инф о нем через Id
  url = `https://api.jikan.moe/v4/anime/${animeId}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      animeData = result.data;

      const { title, synopsis, year, rating, genres, studios, images } =
        animeData;
      //Получаем данные из внутренних массивов
      const bigImageUrl = images.jpg.large_image_url;
      const studioName = studios.map((studio) => studio.name).join(", ");
      const genreList = genres.map((genre) => genre.name).join(", ");
      //Создаем большую карточку
      let bigAnimeCard = `
      <div class="big-card">
      <img class="anime-image-big" src="${bigImageUrl}" alt="${title}" width="" height=""/>
      <div class="short-info">
      <h3 class="title">Title: <span>${title}</span></h3>
      <h3 class="rating">Rating: <span>${rating}</span></h3>
      <h3 class="year">Year: <span>${year}</span></h3>
      <h3 class="studios">Studios: <span>${studioName}</span></h3>
      <h3 class="genre">Genre: <span>${genreList}</span></h3>
      </div>
      <span class="summary">Summary:</span><br>
      <p class="synopsis">${synopsis}</p>

      </div>
      `;

      //С помощью открываем basicLightbox большую карточку аниме
      const instance = basicLightbox.create(bigAnimeCard, {
        onShow: (instance) => {
          window.addEventListener("keydown", closeCard);
          document.addEventListener("click", closeCardOnClick);
        },
        onClose: (instance) => {
          window.removeEventListener("keydown", closeCard);
          document.removeEventListener("click", closeCardOnClick);
        },
      });
      instance.show();
      //Ф-я, что закрывает большую карточку при нажатии Escape
      function closeCard(e) {
        if (e.code === "Escape") {
          instance.close();
        }
      }

      //Закрывает карточку при клике вне ее
      function closeCardOnClick(e) {
        if (!instance.visible() || e.target.closest(".big-card")) {
          return;
        }
        instance.close();
      }
    })
    .catch((error) => console.log(error));
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
      animeFetcher(drawSmallCard, url);
    }
  }, 1000);
});
//
//
