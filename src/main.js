import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formRef = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

formRef.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  hideLoadMoreButton();
  query = event.currentTarget.elements['search-text'].value.trim();
  page = 1;

  if (!query) {
    clearGallery();
    formRef.reset();
    return iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  const data = await getImagesByQuery(query, page);
  hideLoader();

  if (data.hits.length === 0) {
    return iziToast.info({
      title: 'No Results',
      message: 'No images found. Try another keyword.',
      position: 'topRight',
    });
  }

  totalHits = data.totalHits;
  createGallery(data.hits);
  if (data.hits.length === 15 && totalHits > 15) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    iziToast.info({
      title: 'End of Results',
      message: "You've reached the end of search results.",
      position: 'topRight',
    });
  }
}

async function onLoadMore() {
  page += 1;
  showLoader();

  const data = await getImagesByQuery(query, page);
  hideLoader();

  createGallery(data.hits);
  scrollGallery();

  const totalPages = Math.ceil(totalHits / 15);
  if (page >= totalPages) {
    hideLoadMoreButton();
    iziToast.info({
      title: 'End of Results',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
}

function scrollGallery() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
