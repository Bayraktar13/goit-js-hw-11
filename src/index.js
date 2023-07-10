import makeGalleryCard from './templates/gallery-card.hbs';
import { UnsplashApi } from './unsplash-api';

const galleryListEl = document.querySelector('.gallery');

const unsplashApi = new UnsplashApi();

unsplashApi
  .fetchPhotos()
  .then(data => {
    console.log(data);
    const { total, totalHits, hits } = data.data;
      const galleryMarkup = makeGalleryCard(hits);
      galleryListEl.innerHTML = galleryMarkup;
  })
  .catch(err => {
    console.log(err);
  });
