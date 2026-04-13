import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../core/auth';
import { NavIcon } from '../../components/nav-icon/nav-icon';
import { LayoutService } from '../../layout-service';
import { environment } from '../../../../environments/environment';
import { IconName } from '../../components/icon/icon';

export interface NavItem {
  label: string;
  route: string;
  icon: IconName;
  action?: () => void;
  fill?: string;
}

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, NavIcon],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  layoutService = inject(LayoutService);
  platformId = inject(PLATFORM_ID);
  auth = inject(Auth);
  production = environment.production;

  navSections: { title: string; items: NavItem[] }[] = [
    {
      title: 'Top',
      items: [
        { label: 'Discover', route: '/app/recipes/discover', icon: 'discover' },
        { label: 'Saved', route: '/app/recipes/saved', icon: 'saved' },
        { label: 'Meal Plan', route: '/app/households/meal-plan', icon: 'meal-plan' },
        { label: 'Inventory', route: '/app/households/inventory', icon: 'inventory' },
        { label: 'Shopping List', route: '/app/households/shopping-list', icon: 'shopping-list' },
      ],
    },
    {
      title: 'Bottom',
      items: [
        { label: 'Friends', route: '/app/friends', icon: 'friends' },
        { label: 'Households', route: '/app/households', icon: 'households' },
        { label: 'Settings', route: '/app/settings', icon: 'settings' },
        {
          label: 'Log Out',
          route: '/login',
          icon: 'logout',
          action: () => this.logout(),
          fill: 'none',
        },
      ],
    },
  ];

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.logout();
    }
  }
}
