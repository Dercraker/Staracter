import type { NavigationLinks } from '@/types/NavigationLink.schema';
import type { NavigationLinksWithGroup } from '@/types/NavigationLinkWithGroup.schema';
import {
  IconAlertSquareRounded,
  IconCoinEuro,
  IconLayoutDashboard,
  IconMail,
  IconUser,
} from '@tabler/icons-react';

export const LINKS = {
  Landing: {
    Landing: {
      label: 'Home',
      href: '/',
      auth: false,
    },
    LinkA: {
      label: 'Link A',
      href: '/#',
      auth: false,
    },
    LinkB: {
      label: 'Link B',
      href: '/#',
      auth: false,
    },
  },
  Auth: {
    SignIn: {
      label: 'Sign In',
      href: '/auth/signin',
      auth: false,
    },
    SignUp: {
      label: 'Sign Up',
      href: '/auth/signup',
      auth: false,
    },
  },
  Account: {
    Profile: {
      label: 'Profile',
      href: '/account',
      auth: true,
      icon: <IconUser />,
    },
    Delete: {
      label: 'Delete Profile',
      href: '/account/delete',
      auth: true,
      icon: <IconAlertSquareRounded />,
    },
    Billing: {
      label: 'Billing',
      href: '/account/billing',
      auth: true,
      icon: <IconCoinEuro />,
    },
    Settings: {
      label: 'Settings',
      href: '/account/email',
      auth: true,
      icon: <IconMail />,
    },
    VerifyEmail: {
      label: 'Verify Email',
      href: '/account/verify-email',
      auth: true,
      icon: <IconMail />,
    },
  },
  Dashboard: {
    Dashboard: {
      label: 'Dashboard',
      href: '/dashboard',
      auth: true,
      icon: <IconLayoutDashboard />,
    },
    Users: {
      label: 'Users',
      href: '/users',
      auth: true,
      icon: <IconUser />,
    },
  },
  Legal: {
    Privacy: {
      label: 'Privacy Policy',
      href: '/legal/privacy',
      auth: false,
    },
    Terms: {
      label: 'Terms of Service',
      href: '/legal/terms',
      auth: false,
    },
  },
  Payment: {
    Success: {
      label: 'Payment Success',
      href: '/payment/success',
      auth: true,
    },
    Cancel: {
      label: 'Payment Cancel',
      href: '/payment/cancel',
      auth: true,
    },
  },
};

export const HEADER_LINKS: NavigationLinks = [
  LINKS.Landing.LinkA,
  LINKS.Landing.LinkB,
];

export const ACCOUNT_LINKS: NavigationLinks = [
  LINKS.Account.Profile,
  LINKS.Account.Delete,
  LINKS.Account.Billing,
  LINKS.Account.Settings,
  // {
  //   href: '/account/support',
  //   title: 'Contact Support',
  //   icon: <IconHelpOctagon />,
  // },
];

export const DASHBOARD_LINKS: NavigationLinks = [
  LINKS.Dashboard.Dashboard,
  LINKS.Dashboard.Users,
];

export const ACCOUNT_NAVIGATION_MOBILE_LINKS: NavigationLinksWithGroup = [
  {
    title: 'Personal Information',
    links: [LINKS.Account.Profile, LINKS.Account.Delete, LINKS.Account.Billing],
  },
  {
    title: 'Settings',
    links: [LINKS.Account.Settings],
  },
];

export const DASHBOARD_NAVIGATION_LINKS: NavigationLinksWithGroup = [
  {
    title: 'Other',
    links: [LINKS.Dashboard.Users],
  },
];

export const FOOTER_LINKS: NavigationLinksWithGroup = [
  {
    title: 'About',
    links: [LINKS.Landing.Landing, LINKS.Landing.LinkA, LINKS.Landing.LinkB],
  },
  {
    title: 'Project',
    links: [
      LINKS.Landing.Landing,
      LINKS.Landing.Landing,
      LINKS.Landing.Landing,
      LINKS.Landing.Landing,
    ],
  },
  {
    title: 'Community',
    links: [
      LINKS.Landing.Landing,
      LINKS.Landing.Landing,
      LINKS.Landing.Landing,
      LINKS.Landing.Landing,
    ],
  },
];
