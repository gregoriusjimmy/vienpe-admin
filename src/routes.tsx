// const Usesr = React.lazy(() => import('./views/users/User'));
import React from 'react'
import Member from './views/member/member.view'
import Daftar from './views/daftar/daftar.view'

interface View<T> {
  path: String
  name: String
  component: React.FC<T>
  exact?: boolean
}

const routes: Array<View<{} | null>> = [
  //   { path: '/', exact: true, name: 'Home' },
  { path: '/member', name: 'Member', component: Member },
  { path: '/daftar', name: 'Daftar', component: Daftar },
  //   { path: '/theme', name: 'Theme', component: Colors, exact: true },
  //   { path: '/theme/colors', name: 'Colors', component: Colors },
]
export default routes
