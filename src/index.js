import makeGalleryCard from './templates/gallery-card.hbs';
import { UnsplashApi } from './unsplash-api';

const galleryListEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const unsplashApi = new UnsplashApi();

// unsplashApi
//   .fetchPhotos()
//   .then(data => {
//     console.log(data);
//     const { total, totalHits, hits } = data.data;
//     const galleryMarkup = makeGalleryCard(hits);
//     galleryListEl.innerHTML = galleryMarkup;
//   })
//   .catch(err => {
//     console.log(err);
//   });

const onLoadMoreBtnElClick = event => {
  unsplashApi.page += 1;
  unsplashApi
    .fetchPhotos()
    .then(data => {
      const { total, totalHits, hits } = data.data;
      const galleryMarkup = makeGalleryCard(hits);
      galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
    })
    .catch(err => {
      console.log(err);
    });
//   if (this.page * this.perPage >= total) {
//     loadMoreBtnEl.classList.add('is-hidden');
//     loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnElClick);
//   }
};

const onSearchFormElSubmit = event => {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value;
  unsplashApi.searchQuery = searchQuery;
  unsplashApi
    .fetchPhotos()
    .then(data => {
      console.log(data);
      const { total, totalHits, hits } = data.data;
      const galleryMarkup = makeGalleryCard(hits);
      galleryListEl.innerHTML = galleryMarkup;
      loadMoreBtnEl.classList.remove('is-hidden');
      loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
    })
    .catch(err => {
      console.log(err);
    });
};

searchFormEl.addEventListener('submit', onSearchFormElSubmit);
