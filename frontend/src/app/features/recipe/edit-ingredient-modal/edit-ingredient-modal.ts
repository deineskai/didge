import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchableDropdown } from '../../../shared/components/searchable-dropdown/searchable-dropdown';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { InputLabel } from '../../../shared/components/input-label/input-label';
import { Icon } from '../../../shared/components/icon/icon';

@Component({
  selector: 'app-edit-ingredient-modal',
  imports: [SearchableDropdown, Spinner, InputLabel, Icon],
  templateUrl: './edit-ingredient-modal.html',
  styleUrl: './edit-ingredient-modal.css',
})
export class EditIngredientModal {
  @Input({ required: true }) ingredients: any[] = [];
  @Input({ required: true }) units: any[] = [];
  @Input() currentIngredient: any;
  @Input() isOpen: boolean = true;

  @Output() confirm = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter();

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  discard() {
    this.cancel.emit();
    this.close();
  }

  confirmChanges() {
    if (!this.isValidIngredient()) return;
    this.confirm.emit(this.currentIngredient);
    this.close();
  }

  isValidIngredient() {
    const i = this.currentIngredient;
    return i.contained_item?.id != null && i.unit?.id != null && i.quantity > 0;
  }

  removeIngredient() {
    this.remove.emit();
    this.close();
  }
}
