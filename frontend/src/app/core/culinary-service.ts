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

  getTags(): Observable<any> {
    return this.http.get(`${this.apiUrl}/culinary-tags`);
  }

  getIngredients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/culinary-items/ingredients`);
  }

  getDietsAsStrings(recipe: any): string[] {
    const diets = recipe.diets;
    if (diets === null) return [];

    let keys = Object.keys(diets).filter((key) => diets[key] === true);

    if (keys.includes('vegan')) {
      keys = keys.filter((k) => k !== 'vegetarian');
    }

    return keys.map((key) => this.formatDietName(key));
  }

  updateCulinaryItem(new_item: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/culinary-items/${new_item.id}`, new_item);
  }

  createRecipe(): Observable<any> {
    const new_item = {
      name: 'New Recipe',
      culinary_unit_id: 6, // serving
      quantity: 2,
      tag_ids: [],
      icon_id: 'page_with_curl',
      image_url:
        'https://images.unsplash.com/photo-1495461199391-8c39ab674295?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      instructions: [],
      compositions: [],
    };
    return this.http.post(`${this.apiUrl}/culinary-items`, new_item);
  }

  formatDietName(key: string): string {
    if (!key) return '';

    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Macht 'Gluten' und 'Free' daraus
      .join('-');
  }
}
