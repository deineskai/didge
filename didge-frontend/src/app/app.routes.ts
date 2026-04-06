import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Settings } from './features/settings/settings';
import { authGuard } from './core/auth-guard';
import { guestGuard } from './core/guest-guard';
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { AuthLayout } from './shared/layouts/auth-layout/auth-layout';
import { DiscoverRecipes } from './features/discover-recipes/discover-recipes';
import { SavedRecipes } from './features/saved-recipes/saved-recipes';
import { Inventory } from './features/inventory/inventory';
import { MealPlan } from './features/meal-plan/meal-plan';
import { ShoppingList } from './features/shopping-list/shopping-list';
import { Friends } from './features/friends/friends';
import { Households } from './features/households/households';
import { Recipe } from './features/recipe/recipe';
import { ManageHousehold } from './features/households/manage-household/manage-household';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login, canActivate: [guestGuard] },
      { path: 'register', component: Register, canActivate: [guestGuard] },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ],
  },
  {
    path: 'app',
    component: MainLayout,
    children: [
      { path: '', redirectTo: '/app/discover', pathMatch: 'full' },
      { path: 'settings', component: Settings, canActivate: [authGuard] },
      { path: 'recipes/discover', component: DiscoverRecipes, canActivate: [authGuard] },
      { path: 'recipes/saved', component: SavedRecipes, canActivate: [authGuard] },
      { path: 'households/inventory', component: Inventory, canActivate: [authGuard] },
      { path: 'households/meal-plan', component: MealPlan, canActivate: [authGuard] },
      { path: 'households/shopping-list', component: ShoppingList, canActivate: [authGuard] },
      { path: 'friends', component: Friends, canActivate: [authGuard] },
      { path: 'households', component: Households, canActivate: [authGuard] },
      { path: 'recipe', component: Recipe, canActivate: [authGuard] },
      { path: 'households/manage', component: ManageHousehold, canActivate: [authGuard] },
    ],
  },
];
