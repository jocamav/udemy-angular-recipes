import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient-model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanges = new Subject<Recipe[]>();

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

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.notifyChanges();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.notifyChanges();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.notifyChanges();
  }

  notifyChanges() {
    this.recipesChanges.next(this.getRecipes());
  }
}
