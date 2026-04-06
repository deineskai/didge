import { Component } from '@angular/core';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';

@Component({
  selector: 'app-discover-recipes',
  imports: [ContentPageLayout],
  templateUrl: './discover-recipes.html',
  styleUrl: './discover-recipes.css',
})
export class DiscoverRecipes {
  recipes = [
    { id: 1, name: 'Spaghetti Bolognese', imageUrl: 'https://picsum.photos/800/600' },
    { id: 2, name: 'Chicken Curry', imageUrl: 'https://picsum.photos/801/600' },
    { id: 3, name: 'Vegetable Stir Fry', imageUrl: 'https://picsum.photos/802/600' },
    { id: 4, name: 'Beef Tacos', imageUrl: 'https://picsum.photos/803/600' },
    { id: 5, name: 'Grilled Salmon', imageUrl: 'https://picsum.photos/804/600' },
    { id: 6, name: 'Caesar Salad', imageUrl: 'https://picsum.photos/805/600' },
    { id: 7, name: 'Pancakes', imageUrl: 'https://picsum.photos/806/600' },
    { id: 8, name: 'Lentil Soup', imageUrl: 'https://picsum.photos/807/600' },
    { id: 9, name: 'BBQ Ribs', imageUrl: 'https://picsum.photos/808/600' },
    { id: 10, name: 'Mushroom Risotto', imageUrl: 'https://picsum.photos/809/600' },
    { id: 2, name: 'Chicken Curry', imageUrl: 'https://picsum.photos/810/600' },
    { id: 3, name: 'Vegetable Stir Fry', imageUrl: 'https://picsum.photos/811/600' },
    { id: 4, name: 'Beef Tacos', imageUrl: 'https://picsum.photos/812/600' },
    { id: 5, name: 'Grilled Salmon', imageUrl: 'https://picsum.photos/813/600' },
    { id: 6, name: 'Caesar Salad', imageUrl: 'https://picsum.photos/814/600' },
    { id: 7, name: 'Pancakes', imageUrl: 'https://picsum.photos/815/600' },
    { id: 8, name: 'Lentil Soup', imageUrl: 'https://picsum.photos/816/600' },
    { id: 9, name: 'BBQ Ribs', imageUrl: 'https://picsum.photos/817/600' },
    { id: 10, name: 'Mushroom Risotto', imageUrl: 'https://picsum.photos/818/600' },
    { id: 2, name: 'Chicken Curry', imageUrl: 'https://picsum.photos/819/600' },
    { id: 3, name: 'Vegetable Stir Fry', imageUrl: 'https://picsum.photos/820/600' },
    { id: 4, name: 'Beef Tacos', imageUrl: 'https://picsum.photos/821/600' },
    { id: 5, name: 'Grilled Salmon', imageUrl: 'https://picsum.photos/822/600' },
    { id: 6, name: 'Caesar Salad', imageUrl: 'https://picsum.photos/823/600' },
    { id: 7, name: 'Pancakes', imageUrl: 'https://picsum.photos/824/600' },
    { id: 8, name: 'Lentil Soup', imageUrl: 'https://picsum.photos/825/600' },
    { id: 9, name: 'BBQ Ribs', imageUrl: 'https://picsum.photos/826/600' },
    { id: 10, name: 'Mushroom Risotto', imageUrl: 'https://picsum.photos/827/600' }

  ];  
}
