import { Component } from '@angular/core';
import { ContentPageLayout } from '../layouts/content-page-layout/content-page-layout';

@Component({
  selector: 'app-shopping-list',
  imports: [ContentPageLayout],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList {}
