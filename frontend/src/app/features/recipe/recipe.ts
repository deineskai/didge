import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CulinaryService } from '../../core/culinary-service';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';
import { Badge } from '../../shared/components/badge/badge';

@Component({
  selector: 'app-recipe',
  imports: [ContentPageLayout, Badge],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe implements OnInit {
  recipe: any = {};
  diets: string[] = [];
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private culinaryService: CulinaryService,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        console.log('Fetching recipe with ID ', id);
        this.loadRecipe(id);
      }
    });
  }

  loadRecipe(id: number) {
    this.culinaryService.getRecipeById(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.diets = this.getDietsAsStrings();
        this.cdr.detectChanges();
      },
    });
    console.log(this.recipe);
  }

  getDietsAsStrings(): string[] {
    const diets = this.recipe.diets;

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
