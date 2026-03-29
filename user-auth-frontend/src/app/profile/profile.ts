import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html'
})
export class Profile implements OnInit {
  username: string | null = null;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngOnInit() {
    // Only attempt to decode if we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          this.username = decoded.sub;
          console.log('Decoded Username:', this.username);
        } catch (error) {
          console.error('Invalid token', error);
          this.logout();
        }
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}