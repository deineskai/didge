import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../auth';
import { ContentPageLayout } from '../layouts/content-page-layout/content-page-layout';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ContentPageLayout],
  templateUrl: './settings.html'
})
export class Settings implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private auth = inject(Auth);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  username: string | null = null;
  userId: number | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.getUserProfile().subscribe({
        next: (data: any) => {
          this.username = data.username;
          this.userId = data.id;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Session expired or invalid. Please log in again.", err);
          this.auth.logout();
          this.router.navigate(['/login']);
        }
      });
    }
  }

}