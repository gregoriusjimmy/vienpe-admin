import PeopleIcon from '@material-ui/icons/People'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import BookIcon from '@material-ui/icons/Book'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import StyleIcon from '@material-ui/icons/Style'

export type NavType = {
  tag: string
  name?: string
  to?: string
  icon?: React.FC
}

const navigations: Array<NavType | { tag: 'divider' }> = [
  {
    tag: 'nav',
    name: 'Absensi',
    to: '/absensi',
    icon: CardMembershipIcon,
  },
  {
    tag: 'nav',
    name: 'Member',
    to: '/member',
    icon: PeopleIcon,
  },
  {
    tag: 'nav',
    name: 'Membership',
    to: '/membership',
    icon: BookIcon,
  },
  {
    tag: 'nav',
    name: 'Instruktur',
    to: '/instruktur',
    icon: DirectionsRunIcon,
  },
  {
    tag: 'nav',
    name: 'Tipe Membership',
    to: '/tipe-membership',
    icon: StyleIcon,
  },
  {
    tag: 'nav',
    name: 'Kelas',
    to: '/kelas',
    icon: CardMembershipIcon,
  },

  {
    tag: 'divider',
  },
]

export default navigations
