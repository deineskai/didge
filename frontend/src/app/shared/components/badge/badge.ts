import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  @Input({ required: true }) text = 'Badge';
  @Input({ required: true }) id: number = 0;
  @Input() dismissible: boolean = false;

  @Output() dismiss = new EventEmitter();

  dismissBadge(id: number) {
    this.dismiss.emit(id);
  }
}
