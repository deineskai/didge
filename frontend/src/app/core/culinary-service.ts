import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class CulinaryService {
  private apiUrl = environment.culinaryApiUrl;
  private auth = inject(Auth);

  constructor(private http: HttpClient) {}

  getRecipeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/culinary-items/${id}`);
  }
}
