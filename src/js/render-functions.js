import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { loadMoreBtn, ulEl, loader } from './refs';

export const gallery = new SimpleLightbox('.gallery a', {
  /* options */
});

export function createGallery(images) {
  const markup = images.map(createImageCard).join('');
  ulEl.insertAdjacentHTML('beforeend', markup);
  if (images.length > 0) {
    gallery.refresh();
  }
}

export function clearGallery() {
  ulEl.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('visually-hidden');
}

export function hideLoader() {
  loader.classList.add('visually-hidden');
}

function createImageCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy">
      </a>
      <ul class="meta">
        <li><p>Likes</p><span>${likes ?? 0}</span></li>
        <li><p>Views</p><span>${views ?? 0}</span></li>
        <li><p>Comments</p><span>${comments ?? 0}</span></li>
        <li><p>Downloads</p><span>${downloads ?? 0}</span></li>
      </ul>
    </li>`;
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('visually-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('visually-hidden');
}
