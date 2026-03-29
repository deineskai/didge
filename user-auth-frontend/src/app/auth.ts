import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  register(userData: any) {
    // Send user data to Python backend
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap(res => {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
        }
      })
    );
  }

  getUserProfile() {
    return this.http.get(`${this.apiUrl}/users/me`);
  }

  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub ?? null;
    } catch {
      return null;
    }
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}