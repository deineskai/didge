import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';
import { CulinaryService } from '../../core/culinary-service';
import { Badge } from '../../shared/components/badge/badge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover-recipes',
  imports: [ContentPageLayout, Badge],
  templateUrl: './discover-recipes.html',
  styleUrl: './discover-recipes.css',
})
export class DiscoverRecipes {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  culinaryService = inject(CulinaryService);
  recipes: any[] = [];

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.culinaryService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.cdr.detectChanges();
      },
    });
  }

  createRecipe() {
    this.culinaryService.createRecipe().subscribe({
      next: (data) => {
        const recipeId = data.id;
        this.router.navigate(['/app/recipe'], { queryParams: { id: recipeId, editMode: true } });
      },
      error: (err) => {
        console.error('Failed to create recipe', err);
      },
    });
  }
}
