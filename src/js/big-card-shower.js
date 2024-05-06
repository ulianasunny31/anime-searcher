import * as basicLightbox from 'basiclightbox';

//При клике на картинку открывает большую карточку с информацией об аниме
let url;
export const openBigCard = e => {
  e.preventDefault();
  let animeData;
  const animeCard = e.target.closest('.anime-card');

  //Проверяем нажали на карточку или нет
  if (!animeCard) {
    return;
  }
  //Получили Id конкретного аниме
  const animeId = animeCard.dataset.animeId;

  //Получаем это аниме и инф о нем через Id
  url = `https://api.jikan.moe/v4/anime/${animeId}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      animeData = result.data;

      let { title, synopsis, year, rating, genres, studios, images } =
        animeData;

      // //Checking if the info exists
      year = year ? year : '-';
      studios = studios ? studios : '-';
      rating = rating ? rating : '-';
      genres = genres ? genres : '-';

      //Получаем данные из внутренних массивов
      const bigImageUrl = images.jpg.large_image_url;
      const studioName = studios.map(studio => studio.name).join(', ');
      const genreList = genres.map(genre => genre.name).join(', ');

      //Создаем большую карточку
      let bigAnimeCard = `
      <div class="big-card">
      <img class="anime-image-big" src="${bigImageUrl}" alt="${title}" width="" height=""/>
      <div class="short-info">
      <h3 class="big-title title">Title: <span class="small-span">${title}</span></h3>
      <h3 class="big-title rating">Rating: <span class="small-span">${rating}</span></h3>
      <h3 class="big-title year">Year: <span class="small-span">${year}</span></h3>
      <h3 class="big-title studios">Studios: <span class="small-span">${studioName}</span></h3>
      <h3 class="big-title genre">Genre: <span class="small-span">${genreList}</span></h3>
      </div>
      <span class="summary">Summary:</span><br>
      <p class="synopsis">${synopsis}</p>

      </div>
      `;

      //С помощью открываем basicLightbox большую карточку аниме
      const instance = basicLightbox.create(bigAnimeCard, {
        onShow: instance => {
          window.addEventListener('keydown', closeCard);
          document.addEventListener('click', closeCardOnClick);
        },
        onClose: instance => {
          window.removeEventListener('keydown', closeCard);
          document.removeEventListener('click', closeCardOnClick);
        },
      });
      instance.show();
      //Ф-я, что закрывает большую карточку при нажатии Escape
      function closeCard(e) {
        if (e.code === 'Escape') {
          instance.close();
        }
      }

      //Закрывает карточку при клике вне ее
      function closeCardOnClick(e) {
        if (!instance.visible() || e.target.closest('.big-card')) {
          return;
        }
        instance.close();
      }
    })
    .catch(error => console.log(error));
};
