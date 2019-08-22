import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private url = 'https://ng-recipes-course.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  getRecipes() {
    return this.http.get<Recipe[]>(this.url)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
