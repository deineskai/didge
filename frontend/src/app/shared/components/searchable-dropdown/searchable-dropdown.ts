import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './searchable-dropdown.html',
})
export class SearchableDropdown implements OnInit {
  @Input() options: string[] = [
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
  filteredOptions: string[] = [];

  searchControl = new FormControl('');
  isOpen = false;
  selectedOption: string = '';
  activeIndex = -1; // Track highlighted item for keyboard

  ngOnInit() {
    this.filteredOptions = this.options;
    this.searchControl.valueChanges.subscribe((value) => {
      this.filteredOptions = this.options.filter((opt) =>
        opt.toLowerCase().includes(value?.toLowerCase() || ''),
      );
      this.activeIndex = -1; // Reset highlight on search
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.activeIndex = -1;
  }

  select(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    this.searchControl.setValue('');
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
