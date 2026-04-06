import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userData: any) {
    // Send user data to Python backend
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap((res) => {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
        }
      }),
    );
  }

  getUserProfile() {
    return this.http.get(`${this.apiUrl}/users/me`);
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

  getFriends() {
    return this.http.get<any[]>(`${this.apiUrl}/friends`);
  }

  getIncomingRequests() {
    return this.http.get<any[]>(`${this.apiUrl}/friends/requests/incoming`);
  }

  getOutgoingRequests() {
    return this.http.get<any[]>(`${this.apiUrl}/friends/requests/outgoing`);
  }

  sendFriendRequest(toUsername: string) {
    return this.http.post(`${this.apiUrl}/friends/request`, toUsername);
  }

  respondToFriendRequest(requestId: number, accept: boolean) {
    return this.http.post(`${this.apiUrl}/friends/request/respond`, {
      request_id: requestId,
      accept: accept,
    });
  }

  revokeFriendRequest(requestId: number) {
    return this.http.post(`${this.apiUrl}/friends/request/revoke`, {
      request_id: requestId,
    });
  }

  removeFriend(friend_user_id: number) {
    return this.http.post(`${this.apiUrl}/friends/remove`, { friend_user_id: friend_user_id });
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
