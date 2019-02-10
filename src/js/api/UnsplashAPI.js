import { config } from '../lib/config';

export default class UnsplashAPI {
  constructor() {
    this.searchQuery = [
      'drone-capture', 'aerial-capture', 'industrial', 'building', 'construction', 'architecture', 'drone-view',
      'travel', 'portrait', 'fight', 'san-francisco', 'new-york', 'turkey', 'japan', 'korea', 'spain', 'india',
      'thailand',
    ];
    this.selectedKeyword = Math.floor(Math.random() * this.searchQuery.length);
  }

  searchResult() {
    return fetch(
      `https://api.unsplash.com/search/photos/?client_id=${
        config.APPLICATION_ID
      }&query=${this.searchQuery[this.selectedKeyword]}&orientation=portrait`,
    )
      .then((res) => {
        if (res.ok) {
          console.log('search keyword:', this.searchQuery[this.selectedKeyword]);
          return res.json();
        }
        throw new Error(res.status);
      });
  }
}
