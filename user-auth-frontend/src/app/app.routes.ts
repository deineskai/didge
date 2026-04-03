import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Settings } from './settings/settings';
import { authGuard } from './auth-guard';
import { guestGuard } from './guest-guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { DiscoverRecipes } from './discover-recipes/discover-recipes';
import { SavedRecipes } from './saved-recipes/saved-recipes';
import { Inventory } from './inventory/inventory';
import { MealPlan } from './meal-plan/meal-plan';
import { ShoppingList } from './shopping-list/shopping-list';
import { Friends } from './friends/friends';
import { Households } from './households/households';
import { Recipe } from './recipe/recipe';

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
    path: 'app',
    component: MainLayout,
    children: [
      { path: '', redirectTo: '/app/discover', pathMatch: 'full' },
      { path: 'settings', component: Settings, canActivate: [authGuard] },
      { path: 'recipes/discover', component: DiscoverRecipes, canActivate: [authGuard] },
      { path: 'recipes/saved', component: SavedRecipes, canActivate: [authGuard] },
      { path: 'household/inventory', component: Inventory, canActivate: [authGuard] },
      { path: 'household/meal-plan', component: MealPlan, canActivate: [authGuard] },
      { path: 'household/shopping-list', component: ShoppingList, canActivate: [authGuard] },
      { path: 'friends', component: Friends, canActivate: [authGuard] },
      { path: 'households', component: Households, canActivate: [authGuard] },
      { path: 'recipe', component: Recipe, canActivate: [authGuard] }
    ]
  }
];