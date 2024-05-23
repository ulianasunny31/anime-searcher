import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { options } from './refs.js';

let myList = JSON.parse(localStorage.getItem('myList')) || [];
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

  const isAdded = myList.some(anime => String(anime.mal_id) === animeId);
  console.log(myList);

  if (!isAdded) {
    url = `https://api.jikan.moe/v4/anime/${animeId}`;
    fetch(url)
      .then(response => response.json())
      .then(result => {
        let animeData = result.data;

        myList.push(animeData);

        localStorage.setItem('myList', JSON.stringify(myList));

        Notify.info('Added!', {
          position: 'center-top',
          borderRadius: '5px',
          cssAnimationStyle: 'from-bottom',
          clickToClose: true,
        });
      });
  } else {
    Notify.info('You already added this anime to your list', {
      position: 'center-top',
      borderRadius: '5px',
      cssAnimationStyle: 'from-bottom',
      clickToClose: true,
    });
  }
}

export { addToList };
