const input = document.querySelector(".search-input");
const mainContainer = document.querySelector(".main-container");
const loadMoreBtn = document.querySelector("#load-more-btn");

// const { title, synopsis, year, rating, genres, studios, image_url } = anime;

let page = 1;
let perPage = 24;

function animeFetcher() {
  const params = new URLSearchParams({
    limit: perPage,
    page: page,
  });

  fetch(`https://api.jikan.moe/v4/anime?${params}`)
    .then((response) => response.json())
    .then((result) => {
      let animes = result.data;
      if (animes.length === 0) {
        mainContainer.innerHTML = `<h2 class="nothing-heading">Nothing was found</h2>`;
      } else {
        animes.forEach((anime) => {
          drawAnimeCard(anime);
        });
        loadMoreBtn.classList.replace("not-visible", "load-more-btn");
        page += 1;
      }
    })
    .catch((error) => console.log("Error:", error));
}

animeFetcher();

loadMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animeFetcher();
});

function drawAnimeCard(anime) {
  const { title, images } = anime;
  const smallImageUrl = images.jpg.large_image_url;

  let smallAnimeCard = `
  <div class="anime-card">
  <img class="anime-image-small" src="${smallImageUrl}" alt="${title}" width="220" height="300"/>
  <h3 class="anime-small-heading">${title}</h3>
  </div>
  `;
  mainContainer.insertAdjacentHTML("beforeend", smallAnimeCard);
}
