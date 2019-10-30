import { createAction, props } from "@ngrx/store";

const LOGIN_START = "[Auth] Login Start";
const AUTHENTICATE_SUCCESS = "[Auth] Authenticate Success";
const AUTHENTICATE_FAILURE = "[Auth] Authenticate Failure";
const SIGNUP_WITH_EMAIL_START = "[Auth] Sign-up With Email Start";
const AUTO_LOGIN = "[Auth] Auto Login";
const AUTO_LOGOUT = "[Auth] Auto Logout";

const CLEAR_ERROR = "[Auth] Clear Error";
const LOGOUT = "[Auth] Logout";

export const LoginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const AuthenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    email: string,
    userId: string,
    token: string,
    expirationDate: Date,
    redirect: boolean;
  }>()
);
export const AuthenticateFailure = createAction(
  AUTHENTICATE_FAILURE,
  props<{ errorMsg: string }>()
);
export const SignUpWithEmailStart = createAction(
  SIGNUP_WITH_EMAIL_START,
  props<{ email: string; password: string }>()
);
export const AutoLogin = createAction(AUTO_LOGIN);
export const AutoLogout = createAction(AUTO_LOGOUT);
export const ClearError = createAction(CLEAR_ERROR);
export const Logout = createAction(LOGOUT);
// export class AuthenticateSuccess implements Action {
//   readonly type = AUTHENTICATE_SUCCESS;
//   constructor(
//     public payload: {
//       email: string;
//       userId: string;
//       token: string;
//       expirationDate: Date;
//       redirect: boolean;
//     }
//   ) {}
// }

// export class LoginStart implements Action {
//   readonly type = LOGIN_START;
//   constructor(public payload: { email: string; password: string }) {}
// }

// export class AuthenticateFailure implements Action {
//   readonly type = AUTHENTICATE_FAILURE;
//   constructor(public payload: string) {}
// }

// export class SignUpWithEmailStart implements Action {
//   readonly type = SIGNUP_WITH_EMAIL_START;
//   constructor(public payload: { email: string; password: string }) {}
// }

// export class Logout implements Action {
//   readonly type = LOGOUT;
// }

// export class AutoLogin implements Action {
//   readonly type = AUTO_LOGIN;
// }

// export class AutoLogout implements Action {
//   readonly type = AUTO_LOGOUT;
// }

// export class ClearError implements Action {
//   readonly type = CLEAR_ERROR;
// }

// export type AuthActionsUnion =
//   | AuthenticateSuccess
//   | AuthenticateFailure
//   | SignUpWithEmailStart
//   | LoginStart
//   | ClearError
//   | Logout
//   | AutoLogin
//   | AutoLogout;
