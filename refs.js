const input = document.querySelector(".search-inp");
const searchBtn = document.querySelector(".search-btn");
const mainContainer = document.querySelector(".main-container");
const loadMoreBtn = document.querySelector("#load-more-btn");
const modalBackdrop = document.querySelector(".backdrop");
let timerID, inputValue;

let page = 1;
let perPage = 24;

export {
  timerID,
  inputValue,
  input,
  searchBtn,
  mainContainer,
  loadMoreBtn,
  page,
  perPage,
  modalBackdrop,
};
