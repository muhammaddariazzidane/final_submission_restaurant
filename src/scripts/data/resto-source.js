import API_ENDPOINT from '../globals/api-endpoint';

class RestoSource {
  static async allRestaurant() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  //   static async upcomingMovies() {
  //     const response = await fetch(API_ENDPOINT.UPCOMING);
  //     const responseJson = await response.json();
  //     return responseJson.restaurants;
  //   }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

export default RestoSource;
