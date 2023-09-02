const CONFIG = {
  WEB_SOCKET_SERVER: 'wss://stormy-badlands-06326.herokuapp.com',

  PUSH_MSG_VAPID_PUBLIC_KEY:
    'BN7-r0Svv7CsTi18-OPYtJLVW0bfuZ1x1UtrygczKjennA_qs7OWmgOewcuYSYF3Gc_mPbqsDh2YoGCDPL0RxDQ',
  PUSH_MSG_SUBSCRIBE_URL:
    'https://dicoding-movie-push-notif.netlify.app/.netlify/functions/subscribe',
  PUSH_MSG_UNSUBSCRIBE_URL:
    'https://dicoding-movie-push-notif.netlify.app/.netlify/functions/unsubscribe',
  BASE_URL: 'https://restaurant-api.dicoding.dev/',
  // CACHE_NAME: 'KatalogRestaurant-V1',
  BASE_IMAGE_URL: 'https://restaurant-api.dicoding.dev/images/large/',
  DATABASE_NAME: 'restaurants-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
};

export default CONFIG;
