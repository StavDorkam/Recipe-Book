import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Ingredient } from "src/app/models/ingredient.model";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../../ngrx/shopping-list/shopping-list.actions";
import * as fromApp from "../../ngrx/app.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIdx: number;
  editedItem: Ingredient;
  @ViewChild("f", { static: false }) slForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select("shoppingList").subscribe(state => {
      if (state.editedIngredientIdx !== -1) {
        this.editMode = true;
        this.editedItem = state.editedIngredient;
        this.slForm.setValue({ ...this.editedItem });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.store.dispatch(new ShoppingListActions.StopEdit());
    this.store.dispatch(ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm) {
    const { value } = form;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIdx, newIngredient)
      // this.store.dispatch(
      //   new ShoppingListActions.UpdateIngredient(newIngredient)
      // );
      this.store.dispatch(
        ShoppingListActions.UpdateIngredient({ ingredient: newIngredient })
      );
    } else {
      // this.shoppingListService.addIngredient(newIngredient)
      // this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      this.store.dispatch(
        ShoppingListActions.AddIngredient({ ingredient: newIngredient })
      );
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIdx);
    // this.store.dispatch(
    //   new ShoppingListActions.DeleteIngredient()
    // );
    this.store.dispatch(ShoppingListActions.DeleteIngredient());
    this.onClearList();
  }

  onClearList() {
    this.slForm.reset();
    // this.editMode = false;
    // this.store.dispatch(new ShoppingListActions.StopEdit())
    this.store.dispatch(ShoppingListActions.StopEdit());
  }
}
