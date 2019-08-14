import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'this is a test',
      'https://www.maxpixel.net/static/photo/1x/Burgers-Burger-Chickpeas-Recipes-Food-Vegetables-2920072.jpg'),
    new Recipe('Another recipe', 'another tasty one',
      'https://www.publicdomainpictures.net/pictures/300000/nahled/sushi-items-on-a-platter.jpg')
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
