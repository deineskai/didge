import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CulinaryService } from '../../core/culinary-service';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';

@Component({
  selector: 'app-recipe',
  imports: [ContentPageLayout],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe implements OnInit {
  recipe: any = {};
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
    //this.recipeService.getRecipeById(id).subscribe(data => {
    //  this.recipe = data;
    //});
    this.culinaryService.getRecipeById(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.cdr.detectChanges();
      },
    });
    console.log(this.recipe);
  }
}
