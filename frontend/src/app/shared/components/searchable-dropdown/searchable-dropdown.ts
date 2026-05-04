import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './searchable-dropdown.html',
})
export class SearchableDropdown<T = any> implements OnInit {
  @Input() options: T[] = [];
  @Input() bindLabel: string = ''; // Propertry to be shown
  @Input() bindValue: string = ''; // Property to be emitted - if this is empty the whole object is returned
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

  // Hilfsmethode, um den Text für das Template zu extrahieren
  getDisplayLabel(option: T): string {
    if (!option) return '';
    if (this.bindLabel && typeof option === 'object') {
      return this.getDeepValue(option, this.bindLabel) ?? 'invalid value';
    }
    return String(option);
  }

  // Hilfsmethode für den Rückgabewert (ID oder Objekt)
  getInternalValue(option: T): any {
    if (this.bindValue && typeof option === 'object') {
      return this.getDeepValue(option, this.bindValue);
    }
    return option;
  }

  // Findet das passende Label für den aktuell selektierten Wert
  getSelectedLabel(): string {
    const selected = this.options.find((opt) => this.getInternalValue(opt) === this.selectedValue);
    return selected ? this.getDisplayLabel(selected) : 'Bitte wählen...';
  }

  private getDeepValue(obj: any, path: string): any {
    if (!obj || !path) return obj;

    // Teilt den Pfad bei jedem Punkt und wandert durch das Objekt
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  select(option: T) {
    const valueToEmit = this.getInternalValue(option);
    this.selectedValue = valueToEmit;
    this.selectedValueChange.emit(valueToEmit);
    console.log(this.selectedValue);

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
