import RestoSource from '../../data/resto-source';
import { createRestoItemTemplate } from '../templates/template-creator';

const Beranda = {
  async render() {
    return `
    <div class="hero">
    <picture>
      <source media="(min-width: 768px)" data-no-lazy="true" srcset="/images/hero-image_2.jpg">
      <img data-src="/images/hero-image_2.jpg" data-no-lazy="true" alt="Hero Image cuy">
    </picture>
  </div>
  
    <div class="content">
    <h2 class="content__heading">Lists All Restaurant</h2>
    <div id="resto" class="restaurants">
    </div>
  </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestoSource.allRestaurant();
    const restoContainer = document.querySelector('#resto');
    restaurants.forEach((resto) => {
      restoContainer.innerHTML += createRestoItemTemplate(resto);
    });
  },
};

export default Beranda;
