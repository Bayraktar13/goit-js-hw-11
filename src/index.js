import makeGalleryCard from './templates/gallery-card.hbs';
import { UnsplashApi } from './unsplash-api';

const galleryListEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const unsplashApi = new UnsplashApi();

const onLoadMoreBtnElClick = event => {
  unsplashApi.page += 1;
  unsplashApi
    .fetchPhotos()
    .then(data => {
      const { totalHits, hits } = data.data;
      unsplashApi.totalHits = totalHits; // Обновляем общее количество результатов
      const galleryMarkup = makeGalleryCard(hits);
      galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
      checkLoadMoreButtonVisibility(); // Проверяем видимость кнопки "Загрузить еще"
    })
    .catch(err => {
      console.log(err);
    });
};

const onSearchFormElSubmit = event => {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value;
  unsplashApi.searchQuery = searchQuery;
  unsplashApi
    .fetchPhotos()
    .then(data => {
      console.log(data);
      const { totalHits, hits } = data.data;
      unsplashApi.totalHits = totalHits; // Обновляем общее количество результатов
      const galleryMarkup = makeGalleryCard(hits);
      galleryListEl.innerHTML = galleryMarkup;
      loadMoreBtnEl.classList.remove('is-hidden');
      loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
      checkLoadMoreButtonVisibility(); // Проверяем видимость кнопки "Загрузить еще"
    })
    .catch(err => {
      console.log(err);
    });
};

const checkLoadMoreButtonVisibility = () => {
  if (unsplashApi.page * unsplashApi.perPage >= unsplashApi.totalHits) {
    loadMoreBtnEl.classList.add('is-hidden');
    loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnElClick);
  }
};

searchFormEl.addEventListener('submit', onSearchFormElSubmit);
