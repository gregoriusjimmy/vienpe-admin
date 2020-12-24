// const Usesr = React.lazy(() => import('./views/users/User'));
import React from 'react'
import Member from './views/member/member.view'
import Membership from './views/membership/membership.view'
import Instruktur from './views/instruktur/instruktur.view'
import TipeMembership from './views/tipe-membership/tipe-membership.view'
import Kelas from './views/kelas/kelas.view'
import Absensi from './views/absensi/absensi.view'
interface View {
  path: String
  name: String
  component: React.FC<any>
  exact?: boolean
}

const routes: Array<View> = [
  { path: '/absensi', name: 'Absensi', component: Absensi },
  { path: '/member', name: 'Member', component: Member },
  { path: '/membership', name: 'Membership', component: Membership },
  { path: '/instruktur', name: 'Instruktur', component: Instruktur },
  { path: '/tipe-membership', name: 'Tipe Membership', component: TipeMembership },
  { path: '/kelas', name: 'Kelas', component: Kelas },
]
export default routes
