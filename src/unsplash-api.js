'use strict';
import axios from 'axios';

export class UnsplashApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '35727926-793d053d212c7893a5cbfbadb';
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  fetchPhotos() {
    const searchParams = {
      key: this.#API_KEY,
      q: this.searchQuery,
      per_page: this.perPage,
      page: this.page,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: 'true',
    };
    return axios.get(`${this.#BASE_URL}?`, {
      params: searchParams,
    });
  }
}
