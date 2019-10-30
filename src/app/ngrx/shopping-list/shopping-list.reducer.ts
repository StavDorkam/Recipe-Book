import { Ingredient } from "src/app/models/ingredient.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIdx: number;
}

const initialState: State = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIdx: -1
};

const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.AddIngredient, (state, { ingredient }) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient]
  })),
  on(ShoppingListActions.AddIngredients, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients]
  })),
  on(ShoppingListActions.UpdateIngredient, (state, { ingredient }) => {
    const updatedIngredient = {
      ...state.ingredients[state.editedIngredientIdx],
      ...ingredient
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIdx] = updatedIngredient;
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIdx: -1
    };
  }),
  on(ShoppingListActions.DeleteIngredient, state => ({
    ...state,
    ingredients: state.ingredients.filter(
      (ingredient, idx) => idx !== state.editedIngredientIdx
    ),
    editedIngredient: null,
    editedIngredientIdx: -1
  })),
  on(ShoppingListActions.StartEdit, (state, { index }) => ({
    ...state,
    editedIngredientIdx: index,
    editedIngredient: { ...state.ingredients[index] }
  })),
  on(ShoppingListActions.StopEdit, state => ({
    ...state,
    editedIngredient: null,
    editedIngredientIdx: -1
  }))
);

export function reducer(state: State, action: Action) {
  return shoppingListReducer(state, action);
}

// export function shoppingListReducer(
//   state = initialState,
//   action: ShoppingListActions.ShoppingListActionsUnion
// ) {
//   switch (action.type) {
//     case ShoppingListActions.ADD_INGREDIENT:
//       return {
//         ...state,
//         ingredients: [...state.ingredients, action.payload]
//       };
//     case ShoppingListActions.ADD_INGREDIENTS:
//       return {
//         ...state,
//         ingredients: [...state.ingredients, ...action.payload]
//       };
//     case ShoppingListActions.UPDATE_INGREDIENT:
//       const updatedIngredients = [...state.ingredients];
//       updatedIngredients.splice(state.editedIngredientIdx, 1, action.payload);
//       return {
//         ...state,
//         ingredients: updatedIngredients,
//         editedIngredient: null,
//         editedIngredientIdx: -1
//       };
//     case ShoppingListActions.DELETE_INGREDIENT:
//       return {
//         ...state,
//         ingredients: state.ingredients.filter(
//           (ingredient, idx) => idx !== state.editedIngredientIdx
//         ),
//         editedIngredient: null,
//         editedIngredientIdx: -1
//       };
//     case ShoppingListActions.START_EDIT:
//       return {
//         ...state,
//         editedIngredientIdx: action.payload,
//         editedIngredient: { ...state.ingredients[action.payload] }
//       };
//     case ShoppingListActions.STOP_EDIT:
//       return {
//         ...state,
//         editedIngredient: null,
//         editedIngredientIdx: -1
//       };
//     default:
//       return state;
//   }
// }
