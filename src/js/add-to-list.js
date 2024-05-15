let savedAnime = [];
function addToList(e) {
  e.preventDefault();
  e.stopPropagation();
  const addButton = e.target.closest('.add-button');
  const animeCard = e.target.closest('.anime-card');

  //Checking if clicked on the add btn
  if (!addButton) {
    return;
  }

  //Getting id of the chosen anime
  const animeId = animeCard.dataset.animeId;

  url = `https://api.jikan.moe/v4/anime/${animeId}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let animeData = result.data;

      // Добавляем данные карточки в список аниме
      savedAnime.push(animeData);
      console.log(savedAnime);
    });
}

export { savedAnime, addToList };
