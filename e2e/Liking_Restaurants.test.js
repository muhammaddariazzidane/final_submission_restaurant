const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  // I.seeElement('.query'); --> menyebabkan error

  I.see(
    'Tidak ada restaurants untuk ditampilkan',
    '.restaurant-item__not__found'
  );
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(
    'Tidak ada restaurants untuk ditampilkan',
    '.restaurant-item__not__found'
  );

  I.amOnPage('/');

  I.seeElement('.restaurant__title a');
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  // Pastikan ada restoran yang disukai
  I.amOnPage('/');
  I.seeElement('.restaurant__title a');
  const firstRestaurant = locate('.restaurant__title a').first();
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  // Langkah untuk membatalkan suka restoran
  I.click('.restaurant__title a'); // Klik restoran yang telah disukai
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Periksa restoran tidak lagi muncul di daftar restoran yang disukai
  I.amOnPage('/#/favorite');
  I.see(
    'Tidak ada restaurants untuk ditampilkan',
    '.restaurant-item__not__found'
  );
});
