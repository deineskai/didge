import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchableDropdown } from '../../../shared/components/searchable-dropdown/searchable-dropdown';
import { InputLabel } from '../../../shared/components/input-label/input-label';
import { Icon } from '../../../shared/components/icon/icon';
import { Spinner } from '../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-edit-tags-modal',
  imports: [SearchableDropdown, InputLabel, Icon, Spinner],
  templateUrl: './edit-tags-modal.html',
  styleUrl: './edit-tags-modal.css',
})
export class EditTagsModal {
  @Input({ required: true }) tags: any[] = [];
  @Input({ required: true }) availableTags: any[] = [];
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
    this.close();
  }

  removeIngredient() {
    this.remove.emit();
    this.close();
  }
}
