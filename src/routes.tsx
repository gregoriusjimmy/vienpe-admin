import React, { lazy } from 'react'

const Member = lazy(() => import('./views/member/member.view'))
const Membership = lazy(() => import('./views/membership/membership.view'))
const Instruktur = lazy(() => import('./views/instruktur/instruktur.view'))
const TipeMembership = lazy(() => import('./views/tipe-membership/tipe-membership.view'))
const Kelas = lazy(() => import('./views/kelas/kelas.view'))
const Absensi = lazy(() => import('./views/absensi/absensi.view'))

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
