import { select } from "./refs.js";

export function fetchGenres(link) {
  fetch(link)
    .then((response) => response.json())
    .then((result) => {
      let data = result.data;

      const genre = data.map((item) => {
        return `<option value='${item.mal_id}'>${item.name}</option>`;
      });

      select.insertAdjacentHTML("afterbegin", genre);
    })
    .catch((error) => console.log("Error:", error));
}
