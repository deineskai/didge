import { Component, Input } from '@angular/core';
import { IconName, Icon } from '../icon/icon';

@Component({
  selector: 'app-nav-icon',
  imports: [Icon],
  templateUrl: './nav-icon.html',
  styleUrl: './nav-icon.css',
})
export class NavIcon {
  @Input() name!: IconName;
  @Input() strokeWidth: number = 1;
  @Input() fill: string = 'currentColor';
}
