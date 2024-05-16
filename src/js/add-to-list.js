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

      const myList = JSON.parse(localStorage.getItem('myList')) || [];
      myList.push(animeData);

      localStorage.setItem('myList', JSON.stringify(myList));

      const event = new CustomEvent('myListUpdated');
      window.dispatchEvent(event);

      console.log('Saved to localStorage:', myList);
    });
}

export { addToList };
