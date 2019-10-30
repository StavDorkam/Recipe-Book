import * as fromShoppingList from './shopping-list/shopping-list.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromRecipe from './recipe/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipe.State; 
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.reducer,
    auth: fromAuth.reducer,
    recipes: fromRecipe.reducer
}