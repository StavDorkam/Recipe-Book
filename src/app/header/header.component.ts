import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../models/user.model";
import * as fromApp from "../ngrx/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as AuthActions from '../ngrx/auth/auth.actions';
import * as RecipeActions from '../ngrx/recipe/recipe.actions';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  currUser: User;
  userSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select("auth")
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        this.currUser = user;
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.store.dispatch(RecipeActions.StoreRecipes())
  }

  onFetchData() {
    this.store.dispatch(RecipeActions.FetchRecipes())
  }

  onLogout() {
    this.store.dispatch(AuthActions.Logout())
  }
}
