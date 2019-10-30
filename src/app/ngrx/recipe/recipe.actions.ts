import { createAction, props } from "@ngrx/store";
import { Recipe } from "src/app/models/recipe.model";

const SET_RECIPES = "[Recipe] Set Recipes";
const FETCH_RECIPES = "[Recipe] Fetch Recipes";
const STORE_RECIPES = "[Recipe] Store Recipes";
const ADD_RECIPE = "[Recipe] Add Recipe";
const UPDATE_RECIPE = "[Recipe] Update Recipe";
const DELETE_RECIPE = "[Recipe] Delete Recipe";

export const SetRecipes = createAction(
  SET_RECIPES,
  props<{ recipes: Recipe[] }>()
);
export const FetchRecipes = createAction(FETCH_RECIPES);
export const StoreRecipes = createAction(STORE_RECIPES);
export const AddRecipe = createAction(ADD_RECIPE, props<{ recipe: Recipe }>());
export const UpdateRecipe = createAction(
  UPDATE_RECIPE,
  props<{ index: number; recipe: Recipe }>()
);
export const DeleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ index: number }>()
);
