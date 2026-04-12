import { Component } from '@angular/core';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';

@Component({
  selector: 'app-saved-recipes',
  imports: [ContentPageLayout],
  templateUrl: './saved-recipes.html',
  styleUrl: './saved-recipes.css',
})
export class SavedRecipes {

  recipes = [
    { id: 1, name: 'Spaghetti Bolognese', imageUrl: 'https://picsum.photos/800/601' },
    { id: 2, name: 'Chicken Curry', imageUrl: 'https://picsum.photos/801/602' },
    { id: 3, name: 'Vegetable Stir Fry', imageUrl: 'https://picsum.photos/802/603' },
    { id: 4, name: 'Beef Tacos', imageUrl: 'https://picsum.photos/803/604' },
    { id: 5, name: 'Grilled Salmon', imageUrl: 'https://picsum.photos/804/605' },
    { id: 6, name: 'Caesar Salad', imageUrl: 'https://picsum.photos/805/606' },
    { id: 7, name: 'Pancakes', imageUrl: 'https://picsum.photos/806/607' },
    { id: 8, name: 'Lentil Soup', imageUrl: 'https://picsum.photos/807/608' },
    { id: 9, name: 'BBQ Ribs', imageUrl: 'https://picsum.photos/808/609' },
    { id: 10, name: 'Mushroom Risotto', imageUrl: 'https://picsum.photos/809/610' },
    { id: 2, name: 'Chicken Curry', imageUrl: 'https://picsum.photos/810/611' },
    { id: 3, name: 'Vegetable Stir Fry', imageUrl: 'https://picsum.photos/811/612' },
    { id: 4, name: 'Beef Tacos', imageUrl: 'https://picsum.photos/812/613' },
    { id: 5, name: 'Grilled Salmon', imageUrl: 'https://picsum.photos/813/614' },
    { id: 6, name: 'Caesar Salad', imageUrl: 'https://picsum.photos/814/615' },
    { id: 7, name: 'Pancakes', imageUrl: 'https://picsum.photos/815/616' },
    { id: 8, name: 'Lentil Soup', imageUrl: 'https://picsum.photos/816/617' },
    { id: 9, name: 'BBQ Ribs', imageUrl: 'https://picsum.photos/817/618' },
    { id: 10, name: 'Mushroom Risotto', imageUrl: 'https://picsum.photos/818/619' },
    { id: 2, name: 'Chicken Curry', imageUrl: 'https://picsum.photos/819/620' },
    { id: 3, name: 'Vegetable Stir Fry', imageUrl: 'https://picsum.photos/820/621' },
    { id: 4, name: 'Beef Tacos', imageUrl: 'https://picsum.photos/821/622' },
    { id: 5, name: 'Grilled Salmon', imageUrl: 'https://picsum.photos/822/623' },
    { id: 6, name: 'Caesar Salad', imageUrl: 'https://picsum.photos/823/624' },
    { id: 7, name: 'Pancakes', imageUrl: 'https://picsum.photos/824/625' },
    { id: 8, name: 'Lentil Soup', imageUrl: 'https://picsum.photos/825/626' },
    { id: 9, name: 'BBQ Ribs', imageUrl: 'https://picsum.photos/826/627' },
    { id: 10, name: 'Mushroom Risotto', imageUrl: 'https://picsum.photos/827/628' }

  ]; 
}
