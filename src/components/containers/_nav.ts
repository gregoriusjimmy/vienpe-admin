import PeopleIcon from '@material-ui/icons/People'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const navigations = [
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
    icon: CardMembershipIcon,
  },
  {
    tag: 'nav',
    name: 'Instruktur',
    to: '/instruktur',
    icon: CardMembershipIcon,
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
  {
    tag: 'nav',
    name: 'Daftar',
    to: '/daftar',
    icon: PersonAddIcon,
  },
]

export default navigations
