import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurant-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurant: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('resto a');

      expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('resto a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith(
        'resto a'
      );
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('resto')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            3
          );

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'ada juga resto abcde' },
            { id: 333, name: 'ini juga boleh resto a' },
          ];
        }

        return [];
      });

      searchRestaurants('resto a');
    });

    it('should show the name of the restaurats found by Favorite Restaurats', (done) => {
      document
        .getElementById('resto')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames =
            document.querySelectorAll('.restaurant__title');

          expect(restaurantNames.item(0).textContent).toEqual('resto abc');
          expect(restaurantNames.item(1).textContent).toEqual(
            'ada juga resto abcde'
          );
          expect(restaurantNames.item(2).textContent).toEqual(
            'ini juga boleh resto a'
          );

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'ada juga resto abcde' },
            { id: 333, name: 'ini juga boleh resto a' },
          ];
        }

        return [];
      });

      searchRestaurants('resto a');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document
        .getElementById('resto')
        .addEventListener('restaurants:updated', () => {
          const restaurantName =
            document.querySelectorAll('.restaurant__title');
          expect(restaurantName.item(0).textContent).toEqual('-');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurants('resto a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);

      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('resto')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.restaurant-item__not__found').length
          ).toEqual(1);

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('resto a');
    });

    it('should not show any restaurant', (done) => {
      document
        .getElementById('resto')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            0
          );

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('resto a');
    });
  });
});
