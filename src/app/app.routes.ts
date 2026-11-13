import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    // The tabs page holds the bottom tab bar. Every page is shown inside it.
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'motorcycles',
        loadComponent: () => import('./pages/motorcycles/motorcycles.page').then((m) => m.MotorcyclesPage),
      },
      {
        path: 'motorcycles/:id',
        loadComponent: () =>
          import('./pages/motorcycle-detail/motorcycle-detail.page').then((m) => m.MotorcycleDetailPage),
      },
      {
        path: 'accessories',
        loadComponent: () => import('./pages/accessories/accessories.page').then((m) => m.AccessoriesPage),
      },
      {
        path: 'services',
        loadComponent: () => import('./pages/services/services.page').then((m) => m.ServicesPage),
      },
      {
        path: 'financing',
        loadComponent: () => import('./pages/financing/financing.page').then((m) => m.FinancingPage),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.page').then((m) => m.ContactPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tabs/home',
  },
];
