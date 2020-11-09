import PeopleIcon from '@material-ui/icons/People';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default [
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
    tag: 'divider',
  },
  {
    tag: 'nav',
    name: 'Daftar',
    to: '/daftar-member',
    icon: PersonAddIcon,
  },
];
