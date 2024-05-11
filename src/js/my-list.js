function addToList(e) {
  e.preventDefault();

  const addBtn = e.target.closest('.');

  //Checking if clicked on the add btn
  if (!addBtn) {
    return;
  }
  //Getting id of the chosen anime
  const animeId = animeCard.dataset.animeId;
}
