import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchableDropdown } from '../../../shared/components/searchable-dropdown/searchable-dropdown';
import { Spinner } from '../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-edit-ingredient-modal',
  imports: [SearchableDropdown, Spinner],
  templateUrl: './edit-ingredient-modal.html',
  styleUrl: './edit-ingredient-modal.css',
})
export class EditIngredientModal {
  @Input({ required: true }) ingredients: string[] = [];
  @Input({ required: true }) units: any[] = [];
  @Input() currentIngredient: any;

  @Input() isOpen: boolean = true;
  @Output() remove = new EventEmitter();
  @Output() isOpenChange = new EventEmitter<boolean>();

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  save() {
    this.close();
  }

  removeIngredient() {
    this.remove.emit();
  }
}
