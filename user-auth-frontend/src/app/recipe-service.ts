import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RecipeService {
  private apiUrl = 'https://deine-api.de/api/recipes'; // TODO: Update with actual API URL

  constructor(private http: HttpClient) {}

  getRecipeById(id: string): Observable<any> {
    // Ruft z.B. /api/recipes/123 auf
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}