import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-round-button',
  imports: [],
  templateUrl: './round-button.html',
  styleUrl: './round-button.css',
})
export class RoundButton {
  @Input() transparent: boolean = false;
}
