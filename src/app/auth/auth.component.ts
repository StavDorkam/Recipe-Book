import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../ngrx/app.reducer";
import * as AuthActions from "../ngrx/auth/auth.actions";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select("auth").subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.error;
      if (authState.user) {
      }
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.store.dispatch(AuthActions.ClearError());
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { email, password } = form.value;

    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.LoginStart({ email, password }));
    } else {
      this.store.dispatch(
        AuthActions.SignUpWithEmailStart({ email, password })
      );
    }
    form.reset();
  }
}
