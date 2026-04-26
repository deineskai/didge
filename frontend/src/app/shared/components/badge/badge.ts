import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  @Input() text = 'Badge';
}
