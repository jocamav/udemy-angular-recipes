import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'this is a test', 'https://www.maxpixel.net/static/photo/1x/Burgers-Burger-Chickpeas-Recipes-Food-Vegetables-2920072.jpg'),
    new Recipe('Another recipe', 'another tasty one', 'https://www.publicdomainpictures.net/pictures/300000/nahled/sushi-items-on-a-platter.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
