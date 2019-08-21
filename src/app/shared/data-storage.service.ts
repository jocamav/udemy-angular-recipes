import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private url = 'https://ng-recipes-course.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes)
      .subscribe( responseData => {
        console.log(responseData);
      });
  }
}
