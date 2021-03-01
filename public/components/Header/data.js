import Home from '../../assets/img/ui/home.svg';
// import Dashboard from '../../assets/img/ui/dashboard.svg';
import Briefing from '../../assets/img/ui/briefing.svg';
import Settings from '../../assets/img/ui/settings.svg';
import User from '../../assets/img/ui/user.svg';
import Login from '../../assets/img/ui/login.svg';
import Enter from '../../assets/img/ui/enter.svg';

export default [
  {
    id: 1,
    img: Home,
    text: 'Home',
    url: '/',
    private: false
  },
  {
    id: 2,
    img: Briefing,
    text: 'Projects',
    url: '/projects',
    private: true
  },
  {
    id: 3,
    img: Settings,
    text: 'Admin',
    url: '/admin',
    private: true
  },
  {
    id: 4,
    img: User,
    text: 'User',
    url: '/me',
    private: true
  },
  {
    id: 5,
    img: Login,
    text: 'Login',
    url: '/login',
    private: false,
    auth: true
  },
  {
    id: 6,
    img: Enter,
    text: 'Sign Up',
    url: '/signup',
    private: false,
    auth: true
  },
];
