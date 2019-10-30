import { Component, OnInit } from "@angular/core";
import * as fromApp from './ngrx/app.reducer';
import * as AuthActions from './ngrx/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.store.dispatch(AuthActions.AutoLogin())
  }
}
