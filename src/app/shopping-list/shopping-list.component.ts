import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../ngrx/shopping-list/shopping-list.actions";
import * as fromApp from "../ngrx/app.reducer";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingredientsChangeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    // this.store.dispatch(new ShoppingListActions.StartEdit(index));
    this.store.dispatch(ShoppingListActions.StartEdit({ index }));
  }
}
