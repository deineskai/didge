import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';
import { CulinaryService } from '../../core/culinary-service';
import { Badge } from '../../shared/components/badge/badge';

@Component({
  selector: 'app-discover-recipes',
  imports: [ContentPageLayout, Badge],
  templateUrl: './discover-recipes.html',
  styleUrl: './discover-recipes.css',
})
export class DiscoverRecipes {
  private cdr = inject(ChangeDetectorRef);
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
}
