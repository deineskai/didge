import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Auth {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  // Der "Status-Sender": Startet mit true, wenn ein Token da ist
  private loggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  // Das "Status-Observable": Hierauf hören der Guard und die Komponenten
  isLoggedIn$ = this.loggedInSubject.asObservable();

  login(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap((res) => {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
          this.loggedInSubject.next(true); // Status auf "eingeloggt" setzen
        }
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false); // Status auf "ausgeloggt" setzen
    this.router.navigate(['/login']);
  }

  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub ?? null;
    } catch {
      return null;
    }
  }

  // Hilfsmethode für den Guard (synchroner Check)
  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  register(userData: any) {
    // Send user data to Python backend
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
