import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../core/auth';
import { NavIcon } from '../../components/nav-icon/nav-icon';
import { LayoutService } from '../../layout-service';
import { environment } from '../../../../environments/environment';
import { Icon } from '../../components/icon/icon';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, NavIcon, Icon],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  layoutService = inject(LayoutService);
  platformId = inject(PLATFORM_ID);
  private auth = inject(Auth);
  production = environment.production;

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.logout();
    }
  }
}
