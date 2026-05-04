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
  currentIngredient: any | null = { name: 'Salt' };
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

  openEditIngredientModal(ingredient: any) {
    this.currentIngredient = ingredient;
    console.log('Current ingredient: ', ingredient);
    this.editIngredient = true;
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
    'Salt',
  ];
  testUnits: any[] = [
    { id: 1, name: 'g' },
    { id: 2, name: 'kg' },
    { id: 3, name: 'l' },
    { id: 4, name: 'ml' },
    { id: 5, name: 'tsp' },
    { id: 6, name: 'tbsp' },
    { id: 7, name: 'to taste' },
    { id: 8, name: 'pc' },
    { id: 9, name: 'srv' },
  ];

  selectedUnit: number = 3;

  addIngredient() {
    const ingredient = {
      id: 1,
      contained_item: {
        id: 1,
        name: 'Salt',
        unit: {
          id: 1,
          name: 'gram',
          abbreviation: 'g',
          conversion_factor: 1,
          base_unit_id: null,
        },
      },
      unit: {
        id: 1,
        name: 'gram',
        abbreviation: 'g',
        conversion_factor: 1,
        base_unit_id: null,
      },
      quantity: 500.0,
    };
    this.recipe.compositions.push(ingredient);
  }

  removeIngredient(ingredient: any) {
    this.recipe.ingredients = this.recipe.ingredients.filter((i: any) => i !== ingredient);
  }

  createInstruction() {
    this.recipe.instructions.push({ step_number: 0, summary: '', Details: '' });
  }

  deleteInstruction(instruction: any) {
    this.recipe.instructions = this.recipe.instructions.filter((i: any) => i !== instruction);
  }
}
