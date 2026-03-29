import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Settings } from './settings/settings';
import { authGuard } from './auth-guard';
import { guestGuard } from './guest-guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login, canActivate: [guestGuard] },
      { path: 'register', component: Register, canActivate: [guestGuard] },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  },
  {
    path: 'app', // 👈 add prefix
    component: MainLayout,
    children: [
      { path: '', redirectTo: '/app/settings', pathMatch: 'full' },
      { path: 'settings', component: Settings, canActivate: [authGuard] }
    ]
  },
];