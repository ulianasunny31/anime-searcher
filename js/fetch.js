import { select } from "./refs.js";

export function fetcher(link) {
  fetch(link)
    .then((response) => response.json())
    .then((result) => {
      allAnimeData = result.data;
    })
    .catch((error) => console.log("Error:", error));
}

export function fetchGenres(link) {
  fetch(link)
    .then((response) => response.json())
    .then((result) => {
      let data = result.data;

      const genre = data.map((item) => {
        return `<option value='${item.name}'>${item.name}</option>`;
      });

      select.insertAdjacentHTML("afterbegin", genre);
    })
    .catch((error) => console.log("Error:", error));
}
