const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '/',
      component: () => import('@/views/dashboard/DefaultDashboard.vue')
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/DefaultDashboard.vue')
    },
    {
      name: 'Typography',
      path: '/typography',
      component: () => import('@/views/typography/TypographyPage.vue')
    },
    {
      name: 'Colors',
      path: '/colors',
      component: () => import('@/views/lib/VuePaycard.vue')
    },
    {
      name: 'PUSD Wallet',
      path: '/pusd_wallets',
      component: () => import('@/views/pages/pusd_wallet/Transaction.vue')
    },
    {
      name: 'FiatWallet',
      path: '/fiat_wallets/:id',
      component: () => import('@/views/pages/fiat_wallet/FiatPassbook.vue')
    },
    {
      name: 'Payout',
      path: '/create_payout',
      component: () => import('@/views/pages/payout/CreatePayout.vue')
    },
    {
      name: 'Payout Transaction',
      path: '/payout_transaction',
      component: () => import('@/views/pages/payout/PayoutTransaction.vue')
    },
    {
      name: 'Color',
      path: '/icon/ant',
      component: () => import('@/views/icons/AntDesignIcons.vue')
    },
    {
      name: 'other',
      path: '/sample-page',
      component: () => import('@/views/StarterPage.vue')
    }
  ]
};

export default MainRoutes;
