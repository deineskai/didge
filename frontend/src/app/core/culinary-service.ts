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

  getRecipes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/culinary-items/recipes`);
  }

  getUnits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/culinary-units`);
  }

  getDietsAsStrings(recipe: any): string[] {
    const diets = recipe.diets;

    let keys = Object.keys(diets).filter((key) => diets[key] === true);

    if (keys.includes('vegan')) {
      keys = keys.filter((k) => k !== 'vegetarian');
    }

    return keys.map((key) => this.formatDietName(key));
  }

  formatDietName(key: string): string {
    if (!key) return '';

    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Macht 'Gluten' und 'Free' daraus
      .join('-');
  }
}
