import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/models/ingredient.model";

const ADD_INGREDIENT = "[Shopping List] Add Ingredient";
const ADD_INGREDIENTS = "[Shopping List] Add Ingredients";
const UPDATE_INGREDIENT = "[Shopping List] Update Ingredient";
const DELETE_INGREDIENT = "[Shopping List] Delete Ingredient";
const START_EDIT = "[Shopping List] Start Edit";
const STOP_EDIT = "[Shopping List] Stop Edit";



export const AddIngredient = createAction(ADD_INGREDIENT, props<{ingredient: Ingredient}>())
export const AddIngredients = createAction(ADD_INGREDIENTS, props<{ingredients: Ingredient[]}>())
export const UpdateIngredient = createAction(UPDATE_INGREDIENT, props<{ingredient: Ingredient}>())
export const DeleteIngredient = createAction(DELETE_INGREDIENT);
export const StartEdit = createAction(START_EDIT, props<{index: number}>())
export const StopEdit = createAction(STOP_EDIT)

// export class AddIngredient implements Action {
//   readonly type = ADD_INGREDIENT;
//   constructor(public payload: Ingredient) {}
// }

// export class AddIngredients implements Action {
//   readonly type = ADD_INGREDIENTS;
//   constructor(public payload: Ingredient[]) {}
// }

// export class UpdateIngredient implements Action {
//   readonly type = UPDATE_INGREDIENT;
//   constructor(public payload: Ingredient ) {}
// }

// export class DeleteIngredient implements Action {
//   readonly type = DELETE_INGREDIENT;
// }

// export class StartEdit implements Action {
//   readonly type = START_EDIT;
//   constructor(public payload: number) {}
// }

// export class StopEdit implements Action {
//   readonly type = STOP_EDIT;
// }

// export type ShoppingListActionsUnion =
//   | AddIngredient
//   | AddIngredients
//   | UpdateIngredient
//   | DeleteIngredient
//   | StartEdit
//   | StopEdit;
