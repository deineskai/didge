import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Icon],
  templateUrl: './searchable-dropdown.html',
})
export class SearchableDropdown<T = any> implements OnInit {
  private _options: T[] = [];
  @Input() set options(value: T[]) {
    this._options = Array.isArray(value) ? value : [];
    this.filteredOptions = [...this._options];
  }
  get options(): T[] {
    return this._options;
  }

  @Input() bindLabel: string = ''; // Propertry to be shown
  @Input() bindValue: string = ''; // Property to be emitted / compared - if this is empty the whole object is returned / compared

  @Input() selectedValue: any = null;

  @Output() selectedValueChange = new EventEmitter<string>();

  filteredOptions: T[] = [];
  searchControl = new FormControl('');
  isOpen = false;
  activeIndex = -1; // Track highlighted item for keyboard

  ngOnInit() {
    this.filteredOptions = [...this.options];

    this.searchControl.valueChanges.subscribe((value) => {
      const searchStr = value?.toLowerCase() || '';
      this.filteredOptions = this.options.filter((opt) => {
        const displayValue = this.getDisplayLabel(opt).toLowerCase();
        return displayValue.includes(searchStr);
      });
      this.activeIndex = -1; // Reset highlight on search
    });
  }

  getDisplayLabel(option: T): string {
    if (!option) return '';
    if (this.bindLabel && typeof option === 'object') {
      return this.getDeepValue(option, this.bindLabel) ?? 'invalid value';
    }
    return String(option);
  }

  getInternalValue(option: T): any {
    if (this.bindValue && typeof option === 'object') {
      return this.getDeepValue(option, this.bindValue);
    }
    return option;
  }

  getSelectedLabel(): string {
    const selected = this.options.find((opt) =>
      this.deepEqual(this.getInternalValue(opt), this.selectedValue),
    );
    return selected ? this.getDisplayLabel(selected) : 'Select...';
  }

  private deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every((key) => this.deepEqual(obj1[key], obj2[key]));
  }

  private getDeepValue(obj: any, path: string): any {
    if (!obj || !path) return obj;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  select(option: T) {
    const valueToEmit = this.getInternalValue(option);
    this.selectedValue = valueToEmit;
    this.selectedValueChange.emit(valueToEmit);

    this.isOpen = false;
    this.searchControl.setValue('', { emitEvent: false });
    this.filteredOptions = [...this.options];
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.activeIndex = -1;
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        this.activeIndex = (this.activeIndex + 1) % this.filteredOptions.length;
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.activeIndex =
          (this.activeIndex - 1 + this.filteredOptions.length) % this.filteredOptions.length;
        event.preventDefault();
        break;
      case 'Enter':
        if (this.activeIndex !== -1) {
          this.select(this.filteredOptions[this.activeIndex]);
        }
        break;
      case 'Escape':
        this.isOpen = false;
        break;
    }
  }
}
