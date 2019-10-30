import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const USERDATA_KEY = "userData";

const handleAuth = (
  email: string,
  userId: string,
  token: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem(USERDATA_KEY, JSON.stringify(user));
  return AuthActions.AuthenticateSuccess({
    email,
    userId,
    token,
    expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: HttpErrorResponse) => {
  let errorMsg = "An unknown error occurred!";
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.AuthenticateFailure({ errorMsg }));
  }
  switch (errorRes.error.error.message) {
    case "EMAIL_NOT_FOUND":
      errorMsg =
        "The user account has not been registered. The user may have been deleted.";
      break;
    case "INVALID_PASSWORD":
      errorMsg =
        "The password is invalid or the user does not have a password.";
      break;
    case "USER_DISABLED":
      errorMsg = "The user account has been disabled by an administrator.";
      break;
    case "EMAIL_EXISTS":
      errorMsg = "This email is already in use.";
      break;
    case "OPERATION_NOT_ALLOWED":
      errorMsg = "This service is not avaliable.";
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      errorMsg =
        "Too many requests have been sent from this device, try again later.";
      break;
  }
  return of(AuthActions.AuthenticateFailure({ errorMsg }));
};

@Injectable()
export class AuthEffects {
  authSignupWithEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUpWithEmailStart),
      switchMap(signupWithEmailAction => {
        const { email, password } = signupWithEmailAction;
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseWebAPIKey}`,
            {
              email,
              password,
              returnSecureToken: true
            }
          )
          .pipe(
            map(resData => {
              return handleAuth(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLoginWithEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginStart),
      switchMap(authData => {
        const { email, password } = authData;
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseWebAPIKey}`,
            {
              email,
              password,
              returnSecureToken: true
            }
          )
          .pipe(
            tap(resData =>
              this.authService.setLogoutTimer(+resData.expiresIn * 1000)
            ),
            map(resData => {
              return handleAuth(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AuthenticateSuccess),
        tap(authSuccessAction => {
          if (authSuccessAction.redirect) {
            this.router.navigate(["/"]);
          }
        })
      ),
    { dispatch: false }
  );

  authAutoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AutoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem(USERDATA_KEY));
        if (!userData) return { type: "DUMMYACTION" };
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false
          });
        }
        return { type: "DUMMYACTION" };
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.Logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem(USERDATA_KEY);
          this.router.navigate(["/auth"]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
