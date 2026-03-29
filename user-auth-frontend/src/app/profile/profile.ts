import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html'
})
export class Profile implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private auth = inject(Auth);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  username: string | null = null;
  userId: number | null = null;
  message: string | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.getUserProfile().subscribe({
        next: (data: any) => {
          this.username = data.username;
          this.userId = data.id;
          this.message = data.message;
          this.cdr.detectChanges(); // Trigger change detection to update the view with user data
        },
        error: (err) => {
          console.error("Session expired or invalid. Please log in again.", err);
          this.auth.logout();
          this.router.navigate(['/login']);
        }
      });
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.logout();
      this.router.navigate(['/login']);
    }
  }
}