import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import * as fromApp from './ngrx/app.reducer';
import * as AuthActions from './ngrx/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
  constructor(private store: Store<fromApp.AppState>, @Inject(PLATFORM_ID) private platformId) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AuthActions.AutoLogin())
    }
  }
}
