const input = document.querySelector('.search-inp');
const searchBtn = document.querySelector('.search-btn');
const mainContainer = document.querySelector('.main-container');
const loadMoreBtn = document.querySelector('#load-more-btn');
const select = document.getElementById('anime-select');
const goBackBtn = document.getElementById('go-back-btn');
const listContainer = document.querySelector('.main-list-container');
const options = {
  position: 'center-center',
  borderRadius: '5px',
  cssAnimationStyle: 'from-bottom',
  clickToClose: true,
};

export {
  input,
  searchBtn,
  mainContainer,
  loadMoreBtn,
  select,
  goBackBtn,
  options,
  listContainer,
};
