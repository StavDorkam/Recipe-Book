import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import * as RecipeActions from "./recipe.actions";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "src/app/models/recipe.model";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer";

@Injectable()
export class RecipeEffects {
  fetchRecipes$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.FetchRecipes),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        "https://recipe-book-ng-project-6e3d2.firebaseio.com/recipes.json"
      );
    }),
    map(recipes => {
      return recipes.map(recipe => ({
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : []
      }));
    }),
    map(recipes => RecipeActions.SetRecipes({recipes}))
  ))

  // @Effect()
  // fetchRecipes = this.actions$.pipe(
  //   ofType(RecipeActions.FETCH_RECIPES),
  //   switchMap(() => {
  //     return this.http.get<Recipe[]>(
  //       "https://recipe-book-ng-project-6e3d2.firebaseio.com/recipes.json"
  //     );
  //   }),
  //   map(recipes => {
  //     return recipes.map(recipe => ({
  //       ...recipe,
  //       ingredients: recipe.ingredients ? recipe.ingredients : []
  //     }));
  //   }),
  //   map(recipes => new RecipeActions.SetRecipes(recipes))
  // );

  storeRecipes$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.StoreRecipes),
    withLatestFrom(this.store.select("recipes")),
    switchMap(([action, recipesState]) => {
      return this.http.put(
        "https://recipe-book-ng-project-6e3d2.firebaseio.com/recipes.json",
        recipesState.recipes
      );
    })
  ), {dispatch: false})

  // @Effect({ dispatch: false })
  // storeRecipes = this.actions$.pipe(
  //   ofType(RecipeActions.STORE_RECIPES),
  //   withLatestFrom(this.store.select("recipes")),
  //   switchMap(([action, recipesState]) => {
  //     return this.http.put(
  //       "https://recipe-book-ng-project-6e3d2.firebaseio.com/recipes.json",
  //       recipesState.recipes
  //     );
  //   })
  // );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
