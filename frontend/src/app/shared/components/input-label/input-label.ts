import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-label',
  imports: [],
  templateUrl: './input-label.html',
  styleUrl: './input-label.css',
})
export class InputLabel {
  @Input() name: string = 'Label';
}
