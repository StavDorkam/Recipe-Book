import { Injectable } from "@angular/core";
import * as fromApp from "../ngrx/app.reducer";
import { Store } from "@ngrx/store";
import * as AuthActions from "../ngrx/auth/auth.actions";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private _tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this._tokenExpirationTimer = setTimeout(
      () => this.store.dispatch(AuthActions.Logout()),
      expirationDuration
    );
  }

  clearLogoutTimer() {
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
      this._tokenExpirationTimer = null;
    }
  }
}
