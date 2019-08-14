import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient-model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Miniburger', 'Some mini burgers',
      'https://www.maxpixel.net/static/photo/1x/Burgers-Burger-Chickpeas-Recipes-Food-Vegetables-2920072.jpg',
      [
        new Ingredient('Meat', 5),
        new Ingredient('Bread', 3),
        new Ingredient('French fries', 20)
      ]),
    new Recipe('Sushi', 'Sushi with fish and vegetables',
      'https://www.publicdomainpictures.net/pictures/300000/nahled/sushi-items-on-a-platter.jpg', [
        new Ingredient('Rice', 1),
        new Ingredient('Nori', 4),
        new Ingredient('Fish', 2)
      ])
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
