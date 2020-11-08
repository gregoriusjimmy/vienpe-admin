// const Usesr = React.lazy(() => import('./views/users/User'));
import React from 'react';
import Users from './views/users/users.view';

interface View {
  path: String;
  name: String;
  component: React.FC;
  exact?: boolean;
}

const routes: Array<View> = [
  //   { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'Users', component: Users },
  //   { path: '/theme', name: 'Theme', component: Colors, exact: true },
  //   { path: '/theme/colors', name: 'Colors', component: Colors },
];
export default routes;
