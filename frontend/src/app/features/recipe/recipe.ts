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
  quantity: number = 0;
  units: any = {};
  availableIngredients: any[] = [];
  editMode: boolean = false;
  editIngredient: boolean = false;
  currentIngredient: any | null = { name: 'Salt' };
  ingredientDraft: any = {};
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private culinaryService: CulinaryService,
  ) {}

  sanitizeIngredients() {
    this.recipe.compositions = this.recipe.compositions.filter((c: any) => {
      const isValid = c.contained_item?.id != null && c.unit?.id != null && c.quantity != null;
      console.log('Item:', c.contained_item?.name, 'Valid:', isValid);
      return isValid;
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadRecipe(id);
      }
    });
    this.loadUnits();
    this.loadAvailableIngredients();
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

  loadAvailableIngredients() {
    this.culinaryService.getIngredients().subscribe({
      next: (data) => {
        this.availableIngredients = data;
        this.cdr.detectChanges();
      },
    });
    console.log(this.availableIngredients);
  }

  loadUnits() {
    this.culinaryService.getUnits().subscribe({
      next: (data) => {
        this.units = data;
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
    if (this.editMode) {
      this.recipe.quantity = this.quantity;
    }
    this.editMode = !this.editMode;
  }

  openEditIngredientModal(ingredient: any) {
    this.currentIngredient = ingredient;
    this.ingredientDraft = structuredClone(this.currentIngredient);
    this.editIngredient = true;
    console.log({
      currentIndgredient: this.ingredientDraft,
      ingredients: this.availableIngredients,
    });
  }

  updateIngredient() {
    const index = this.recipe.compositions.indexOf(this.currentIngredient);

    if (index !== -1) {
      this.recipe.compositions[index] = structuredClone(this.ingredientDraft);
    }
    this.editIngredient = false;
  }

  addIngredient() {
    const ingredient = {
      contained_item: {},
      unit: {},
    };
    this.recipe.compositions.push(ingredient);
    this.openEditIngredientModal(this.recipe.compositions.at(-1));
  }

  removeIngredient() {
    this.recipe.compositions = this.recipe.compositions.filter(
      (c: any) => c !== this.currentIngredient,
    );
  }

  createInstruction() {
    this.recipe.instructions.push({ step_number: 0, summary: '', Details: '' });
  }

  deleteInstruction(instruction: any) {
    this.recipe.instructions = this.recipe.instructions.filter((i: any) => i !== instruction);
  }
}
