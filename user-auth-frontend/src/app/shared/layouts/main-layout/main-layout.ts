import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../core/auth';
import { NavIcon } from '../../components/nav-icon/nav-icon';
import { NavItem } from '../../components/nav-item/nav-item';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, NavIcon],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private platformId = inject(PLATFORM_ID);
  private auth = inject(Auth);
  protected isSidebarOpen = false;

  username = isPlatformBrowser(this.platformId) ? this.auth.getUsername() : null;
  menuOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.logout();
    }
  }
}
