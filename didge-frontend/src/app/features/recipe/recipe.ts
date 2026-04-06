import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../core/recipe-service';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';

@Component({
  selector: 'app-recipe',
  imports: [ContentPageLayout],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe implements OnInit {
  recipe: any = { coverImageSrc: 'https://picsum.photos/1000/800', id: 123456789 };

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadRecipe(id);
      }
    });
  }

  loadRecipe(id: string) {
    //this.recipeService.getRecipeById(id).subscribe(data => {
    //  this.recipe = data;
    //});
    this.recipe.id = id;
  }
}
