import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../auth';
import { Icon } from '../../icon/icon';

@Component({
  selector: 'app-test-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
  templateUrl: './test-layout.html',
  styleUrl: './test-layout.css',
})
export class TestLayout {
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
