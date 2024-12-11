// icons
import {
  QuestionOutlined,
  AppstoreOutlined, 
  ChromeOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  ProfileOutlined,
  FontSizeOutlined,
  BgColorsOutlined,
  SwitcherOutlined,
  BarsOutlined,
  WalletOutlined,
  BarcodeOutlined,
  CrownOutlined
} from '@ant-design/icons-vue';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Main' },
  {
    title: 'Dashboard',
    icon: AppstoreOutlined,
    to: '/dashboard'
  },
  
  { header: 'Payouts' },
  {
    title: 'Payout',
    icon: BarsOutlined, 
    to: '/create_payout'
  },
  {
    title: 'Payout Transaction',
    icon: WalletOutlined,
    to: '/payout_transaction',
    
  },
  {
    title: 'Fiat Wallets',
    icon: WalletOutlined,
    to: '/fiat_wallets/{id}',
    
  },
  
  { header: 'Virtual Card' },
  {
    title: 'Users',
    icon: TeamOutlined,
    to: '/auth/login'
  },
  {
    title: 'vCards',
    icon: SwitcherOutlined,
    to: '/auth/register'
  },
  { header: 'Wallets' },
  {
    title: 'PUSD Wallets',
    icon: WalletOutlined,
    to: '/pusd_wallets'
  },
  {
    title: 'Transactions',
    icon: CrownOutlined, 
    to: '/colors'
  },
  // {
  //   title: 'Shadow',
  //   icon: BarcodeOutlined,
  //   to: '/shadow'
  // },
  // {
  //   title: 'Ant Icons',
  //   icon: CrownOutlined,
  //   to: '/icon/ant'
  // },
  { header: 'Support' },
  // {
  //   title: 'Contact Us',
  //   icon: ChromeOutlined,
  //   to: '/sample-page'
  // },
  {
    title: 'Documentation',
    icon: QuestionOutlined,
    to: 'https://www.postman.com/swychr/vcard-apis/folder/giyb79l/webhooks',
    type: 'external',
   
  }
];

export default sidebarItem;
