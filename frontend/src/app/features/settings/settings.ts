import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';
import { UserService } from '../../core/user-service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ContentPageLayout],
  templateUrl: './settings.html',
})
export class Settings implements OnInit {
  platformId = inject(PLATFORM_ID);
  auth = inject(Auth);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  userService = inject(UserService);

  username: string | null = null;
  userId: number | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.getUserProfile().subscribe({
        next: (data: any) => {
          this.username = data.username;
          this.userId = data.id;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Session expired or invalid. Please log in again.', err);
          this.auth.logout();
          this.router.navigate(['/login']);
        },
      });
    }
  }
}
