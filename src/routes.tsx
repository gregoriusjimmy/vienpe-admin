// const Usesr = React.lazy(() => import('./views/users/User'));
import React from 'react';
import Member from './views/member/member.view';

interface View {
  path: String;
  name: String;
  component: React.FC;
  exact?: boolean;
}

const routes: Array<View> = [
  //   { path: '/', exact: true, name: 'Home' },
  { path: '/member', name: 'Member', component: Member },
  //   { path: '/theme', name: 'Theme', component: Colors, exact: true },
  //   { path: '/theme/colors', name: 'Colors', component: Colors },
];
export default routes;
