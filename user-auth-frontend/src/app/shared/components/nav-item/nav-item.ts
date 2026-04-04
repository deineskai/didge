import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.css',
})
export class NavItem {
  @Input() routerLink!: string;
  @Input() text!: string;
}
