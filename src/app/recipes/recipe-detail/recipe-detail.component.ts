import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as fromApp from "../../ngrx/app.reducer";
import * as RecipeActions from "../../ngrx/recipe/recipe.actions";
import * as ShoppingListActions from "../../ngrx/shopping-list/shopping-list.actions";
import { Recipe } from "../../models/recipe.model";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = null;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => +params.id),
        switchMap(id => {
          this.id = id;
          return this.store.select("recipes");
        }),
        map(recipeState =>
          recipeState.recipes.find((recipe, index) => index === this.id)
        )
      )
      .subscribe(recipe => (this.recipe = recipe));
  }

  onAddToShoppingList() {
    // this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    this.store.dispatch(
      ShoppingListActions.AddIngredients({
        ingredients: this.recipe.ingredients
      })
    );
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipeActions.DeleteRecipe({index: this.id}));
    this.router.navigate(["/recipes"]);
  }
}
