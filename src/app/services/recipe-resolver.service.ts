import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import * as fromApp from "../ngrx/app.reducer";
import * as RecipeActions from "../ngrx/recipe/recipe.actions";
import { Recipe } from "../models/recipe.model";
import { Store } from "@ngrx/store";
import { take, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("recipes").pipe(
      take(1),
      map(recipesState => recipesState.recipes),
      switchMap(recipes => {
        if (!recipes.length) {
          this.store.dispatch(RecipeActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipeActions.SetRecipes.type),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
