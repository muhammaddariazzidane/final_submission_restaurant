import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (resto) => `
  <h2 class="restaurant__title">${resto.name}</h2>
  <div class="container">
  <img class="restaurant__poster lazyload" data-src="${
    CONFIG.BASE_IMAGE_URL + resto.pictureId
  }" alt="${resto.name}" />
  <div class="restaurant__info">
  <h3>Information</h3>
  <h4>Alamat</h4>
  <p>${resto.address} kota ${resto.city}</p>
  <h4>Rating</h4>
    <p>${resto.rating}</p>
    <div class="list-menu">
    <h4>Menu Makanan</h4>

    <ul class="">
    ${resto.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
    </ul>
    </div>
    <div class="list-menu">
    <h4>Menu Minuman</h4>
    <ul class="">
    ${resto.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
    </ul>
    </div>
    </div>
    </div>
  <div class="restaurant__overview">
    <h3>Deskripsi</h3>
    <p>${resto.description}</p>
  </div>
  <div class="review">
  <h4>Review customer</h4>
  <ul>
  ${resto.customerReviews
    .map(
      (review) => `
      <li>
    <h4>${review.name}</h4>
    <p>${review.review}</p>
    <h6>${review.date}</h6>
    </li>`
    )
    .join('')}
  </ul>
  </div>
`;

const createRestoItemTemplate = (resto) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
    <img class="restaurant-item__header__poster lazyload" alt="${resto.name}"
           data-src="${
             resto.pictureId
               ? CONFIG.BASE_IMAGE_URL + resto.pictureId
               : 'https://picsum.photos/id/666/800/450?grayscale'
           }">
    <div class="restaurant-item__header__rating">
    <p>⭐️<span class="restaurant-item__header__rating__score">${
      resto.rating
    }</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__title"><a href="/#/detail/${resto.id}">${
  resto.name || '-'
}</a></h3>
      <p class="kota">Kota : ${resto.city}</p>
      <p>${resto.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;
const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;
const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createUnlikeButtonTemplate,
};
