import UrlParser from '../../routes/url-parser';
// import TheMovieDbSource from '../../data/themoviedb-source';
// import { createMovieDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
// import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import FavoriteRestoIdb from '../../data/favorite-restaurant-db';
import RestoSource from '../../data/resto-source';
import { createRestoDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
      <div id="resto" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestoSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#resto');
    restaurantContainer.innerHTML = createRestoDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestoIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        pictureId: restaurant.pictureId,
        address: restaurant.address,
        description: restaurant.description,
        rating: restaurant.rating,
      },
    });
  },
};

export default Detail;

// import RestoSource from '../../data/resto-source';
// import UrlParser from '../../routes/url-parser';
// import { createRestoDetailTemplate } from '../templates/template-creator';
// import LikeButtonInitiator from '../../utils/like-button-initiator';

// const Detail = {
//   async render() {
//     return `
//           <div id="resto" class="restaurant"></div>
//           <div id="likeButtonContainer"></div>
//         `;
//   },

//   async afterRender() {
//     const url = UrlParser.parseActiveUrlWithoutCombiner();
//     const restaurant = await RestoSource.detailRestaurant(url.id);
//     const restoContainer = document.querySelector('#resto');

//     restoContainer.innerHTML = createRestoDetailTemplate(restaurant);
//     LikeButtonInitiator.init({
//       likeButtonContainer: document.querySelector('#likeButtonContainer'),
//       restaurant: {
//         id: restaurant.id,
//         name: restaurant.name,
//         city: restaurant.city,
//         pictureId: restaurant.pictureId,
//         address: restaurant.address,
//         description: restaurant.description,
//         rating: restaurant.rating,
//       },
//     });
//   },
// };

// export default Detail;
