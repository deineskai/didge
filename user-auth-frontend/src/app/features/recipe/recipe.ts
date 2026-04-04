import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../core/recipe-service';

@Component({
  selector: 'app-recipe',
  imports: [],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe implements OnInit {
  recipe: any;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
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
    this.recipe = id;
  }
}