import { Recipe } from "src/app/models/recipe.model";
import * as RecipeActions from "./recipe.actions";
import { Action, createReducer, on } from "@ngrx/store";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

const recipeReducer = createReducer(
  initialState,
  on(RecipeActions.SetRecipes, (state, { recipes }) => ({
    ...state,
    recipes: [...recipes]
  })),
  on(RecipeActions.AddRecipe, (state, { recipe }) => ({
    ...state,
    recipes: [...state.recipes, recipe]
  })),
  on(RecipeActions.UpdateRecipe, (state, { index, recipe }) => {
    const updatedRecipe = { ...state.recipes[index], ...recipe };
    const updatedRecipes = [...state.recipes];
    updatedRecipes[index] = updatedRecipe;
    return {
      ...state,
      recipes: updatedRecipes
    };
  }),
  on(RecipeActions.DeleteRecipe, (state, { index }) => ({
    ...state,
    recipes: [...state.recipes.filter((recipe, idx) => idx !== index)]
  }))
);

export function reducer(state: State, action: Action) {
  return recipeReducer(state, action)
}

// export function RecipeReducer(
//   state = initialState,
//   action: RecipeActions.RecipeActionsUnion
// ) {
//   switch (action.type) {
//     case RecipeActions.SET_RECIPES:
//       return {
//         ...state,
//         recipes: [...action.payload]
//       };
//     case RecipeActions.ADD_RECIPE:
//       return {
//         ...state,
//         recipes: [...state.recipes, action.payload]
//       };
//     case RecipeActions.UPDATE_RECIPE:
//       const updatedRecipes = [...state.recipes];
//       updatedRecipes.splice(action.payload.index, 1, action.payload.recipe);
//       return {
//         ...state,
//         recipes: [...updatedRecipes]
//       };
//     case RecipeActions.DELETE_RECIPE:
//       return {
//         ...state,
//         recipes: [
//           ...state.recipes.filter((recipe, index) => index !== action.payload)
//         ]
//       };
//     default:
//       return state;
//   }
// }
