import {
  // createMovieItemTemplate,
  createRestoItemTemplate,
} from '../../templates/template-creator';

class FavoriteRestaurantView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
      <div class="content">
      <h2 class="content__heading">Your Favorite Restaurant</h2>
      <input id="query" type="text">
        <div id="resto" class="restaurants">
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) =>
          carry.concat(createRestoItemTemplate(restaurant)),
        ''
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('resto').innerHTML = html;

    document
      .getElementById('resto')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  // eslint-disable-next-line class-methods-use-this
  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restaurants untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
