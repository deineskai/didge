import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Auth } from './auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {
  private apiUrl = environment.householdApiUrl;
  private auth = inject(Auth);

  constructor(private http: HttpClient) {}

  createHousehold(name: String) {
    return this.http.post(`${this.apiUrl}/household`, {
      name: name,
      user_id: this.auth.getUserId(),
    });
  }

  getHouseholds() {
    return this.http.get<any[]>(`${this.apiUrl}/households`);
  }

  getInvitations() {
    return this.http.get(`${this.apiUrl}/households/invitations`);
  }

  sendInvitation(to_user_id: number, household_id: number) {
    return this.http.post(`${this.apiUrl}/households/invitations`, {
      to_user_id: to_user_id,
      household_id: household_id,
    });
  }

  respondToInvitation(invitation_id: number, accept: boolean) {
    return this.http.post(`${this.apiUrl}/households/invitations/respond`, {
      invitation_id: invitation_id,
      accept: accept,
    });
  }

  getHousehold(id: number) {
    return this.http.get(`${this.apiUrl}/household?id=${id}`);
  }

  deleteHousehold(id: number) {
    return this.http.delete(`${this.apiUrl}/household?id=${id}`);
  }

  removeHouseholdMember(household_id: number, remove_user_id: number) {
    return this.http.delete(`${this.apiUrl}/households/members`, {
      body: {
        household_id: household_id,
        remove_user_id: remove_user_id,
      },
    });
  }
}
