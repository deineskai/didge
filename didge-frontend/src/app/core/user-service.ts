import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getUserProfile() {
    return this.http.get(`${this.apiUrl}/users/me`);
  }

  getPublicUserProfiles(userIds: []) {
    let params = new HttpParams();
    userIds.forEach((id) => {
      params = params.append('user_ids', id);
    });
    return this.http.get(`${this.apiUrl}/users/public`, { params });
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
