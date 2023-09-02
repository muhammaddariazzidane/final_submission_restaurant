import Detail from '../views/pages/detail';
import Beranda from '../views/pages/Beranda';
import Favorite from '../views/pages/favorite';

const routes = {
  '/detail/:id': Detail,
  '/': Beranda, // default page
  '/all-restaurant': Beranda,
  '/favorite': Favorite,
};

export default routes;
