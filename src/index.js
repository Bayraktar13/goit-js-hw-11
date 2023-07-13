import makeGalleryCard from './templates/gallery-card.hbs';
import { UnsplashApi } from './unsplash-api';

const galleryListEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const messageEl = document.querySelector('.message');

const unsplashApi = new UnsplashApi();

const onLoadMoreBtnElClick = async event => {
  // Делаю через async/await/try (onLoadMoreBtnElClick объявлена как async). Внизу скрипт через then/.catch.
  try {
    unsplashApi.page += 1;
    const data = await unsplashApi.fetchPhotos();
    const { totalHits, hits } = data.data;
    unsplashApi.totalHits = totalHits; // Обновляем общее количество результатов
    const galleryMarkup = makeGalleryCard(hits);
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
    checkLoadMoreButtonVisibility(); // Проверяем видимость кнопки "Загрузить еще"
    showMessage("We are sorry, but you've reached the end of search results.");
  } catch (err) {
    console.log(err);
  }

  // Делаю через then/.catch
  //
  // unsplashApi.page += 1;
  // unsplashApi
  //   .fetchPhotos()
  //   .then(data => {
  //     const { totalHits, hits } = data.data;
  //     unsplashApi.totalHits = totalHits; // Обновляем общее количество результатов
  //     const galleryMarkup = makeGalleryCard(hits);
  //     galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
  //     checkLoadMoreButtonVisibility(); // Проверяем видимость кнопки "Загрузить еще"
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

const onSearchFormElSubmit = async event => {
  event.preventDefault();
  console.log(unsplashApi.page);
  galleryListEl.innerHTML = '';
  unsplashApi.page = 1;
  console.log(unsplashApi.page);
  const searchQuery = event.currentTarget.elements.searchQuery.value;
  unsplashApi.searchQuery = searchQuery;
  // Делаю через async/await/try (onSearchFormElSubmit объявлена как async). Внизу скрипт через fetch/then.
  try {
    const data = await unsplashApi.fetchPhotos();
    console.log(data);
    const { totalHits, hits } = data.data;
    unsplashApi.totalHits = totalHits;
    const galleryMarkup = makeGalleryCard(hits);
    galleryListEl.innerHTML = galleryMarkup;
    loadMoreBtnEl.classList.remove('is-hidden');
    loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
    checkLoadMoreButtonVisibility();
    showMessage("We are sorry, but you've reached the end of search results.");
    //
  } catch (err) {
    console.log(err);
  }

  // Делаю через then/.catch
  //
  //   unsplashApi
  //     .fetchPhotos()
  //     .then(data => {
  //       console.log(data);
  //       const { totalHits, hits } = data.data;
  //       unsplashApi.totalHits = totalHits; // Обновляем общее количество результатов
  //       const galleryMarkup = makeGalleryCard(hits);
  //       galleryListEl.innerHTML = galleryMarkup;
  //       loadMoreBtnEl.classList.remove('is-hidden');
  //       loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
  //       checkLoadMoreButtonVisibility(); // Проверяем видимость кнопки "Загрузить еще"
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
};

const checkLoadMoreButtonVisibility = () => {
  if (
    unsplashApi.page * unsplashApi.perPage >= unsplashApi.totalHits ||
    hits.length === 0
  ) {
    loadMoreBtnEl.classList.add('is-hidden');
    loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnElClick);
  }
};

const showMessage = message => {
  if (
    unsplashApi.page * unsplashApi.perPage >= unsplashApi.totalHits ||
    hits.length === 0
  ) {
    messageEl.textContent = message;
    messageEl.classList.remove('is-hidden');
  }
};

searchFormEl.addEventListener('submit', onSearchFormElSubmit);
