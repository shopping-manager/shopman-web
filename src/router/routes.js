
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MainMap.vue') },
      { path: 'shoppinglist', component: () => import('pages/ShoppingList.vue') },
      { path: 'reportstoreproblem', component: () => import('pages/ReportStoreProblem.vue') },
      { path: 'reportshortage', component: () => import('pages/ReportShortage.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
