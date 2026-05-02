import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CulinaryService } from '../../core/culinary-service';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';
import { Badge } from '../../shared/components/badge/badge';
import { EditableInstruction } from '../../shared/components/editable-instruction/editable-instruction';
import { Icon } from '../../shared/components/icon/icon';
import { EditIngredientModal } from './edit-ingredient-modal/edit-ingredient-modal';
import { Spinner } from '../../shared/components/spinner/spinner';
import { SearchableDropdown } from '../../shared/components/searchable-dropdown/searchable-dropdown';
import { InputLabel } from '../../shared/components/input-label/input-label';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    ContentPageLayout,
    Badge,
    FormsModule,
    EditableInstruction,
    Icon,
    EditIngredientModal,
    Spinner,
    SearchableDropdown,
    InputLabel,
  ],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe implements OnInit {
  recipe: any = {};
  diets: string[] = [];
  quantity: number = 1;
  editMode: boolean = false;
  editIngredient: boolean = false;
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private culinaryService: CulinaryService,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadRecipe(id);
      }
    });
  }

  loadRecipe(id: number) {
    this.culinaryService.getRecipeById(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.quantity = this.recipe.quantity;
        this.diets = this.culinaryService.getDietsAsStrings(this.recipe);
        this.cdr.detectChanges();
      },
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    this.quantity--;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  toggleIngredientEditMode() {
    this.editIngredient = !this.editIngredient;
  }

  testIngredients = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Lemon',
    'Mango',
    'Orange',
  ];
  testUnits: string[] = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'to taste', 'pc', 'srv'];
}
