import FavoriteRestoIdb from '../../data/favorite-restaurant-db';
import FavoriteRestaurantSearchPresenter from './favorite-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './favorite-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantView from './favorite-restaurants/favorite-restaurant-view';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // eslint-disable-next-line no-new
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoriteRestoIdb,
    });
    // eslint-disable-next-line no-new
    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants: FavoriteRestoIdb,
    });
  },
};

export default Favorite;
