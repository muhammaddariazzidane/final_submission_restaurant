import { spyOn } from 'jest-mock';
import * as RestoFactories from './helpers/restoFactories';
import FavoriteRestoIdb from '../src/scripts/data/favorite-restaurant-db';

describe('Liking A restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();

    spyOn(FavoriteRestoIdb, 'searchRestaurants');
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await RestoFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await RestoFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await RestoFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Memastikan film berhasil disukai
    const restaurant = await FavoriteRestoIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestoIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await RestoFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteRestoIdb.putRestaurant({ id: 1 });

    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Tidak ada film yang ganda
    expect(await FavoriteRestoIdb.getAllRestaurant()).toEqual([{ id: 1 }]);

    await FavoriteRestoIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await RestoFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllRestaurant()).toEqual([]);
  });
});
