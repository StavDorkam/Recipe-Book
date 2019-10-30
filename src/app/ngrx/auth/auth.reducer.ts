import { User } from "src/app/models/user.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  error: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.LoginStart, AuthActions.SignUpWithEmailStart, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(
    AuthActions.AuthenticateSuccess,
    (state, { email, userId, token, expirationDate }) => {
      const user = new User(email, userId, token, expirationDate);
      return {
        ...state,
        error: null,
        loading: false,
        user
      };
    }
  ),
  on(AuthActions.AuthenticateFailure, (state, { errorMsg }) => ({
    ...state,
    user: null,
    loading: false,
    error: errorMsg
  })),
  on(AuthActions.ClearError, state => ({ ...state, error: null })),
  on(AuthActions.Logout, state => ({ ...state, user: null, error: null }))
);

export function reducer(state: State, action: Action) {
  return authReducer(state, action);
}

// export function authReducer(
//   state = initialState,
//   action: AuthActions.AuthActionsUnion
// ) {
//   switch (action.type) {
//     case AuthActions.AUTHENTICATE_SUCCESS:
//       const user = new User(
//         action.payload.email,
//         action.payload.userId,
//         action.payload.token,
//         action.payload.expirationDate
//       );
//       return {
//         ...state,
//         error: null,
//         loading: false,
//         user
//       };
//     case AuthActions.LOGIN_START:
//     case AuthActions.SIGNUP_WITH_EMAIL_START:
//       return {
//         ...state,
//         loading: true,
//         error: null
//       };
//     case AuthActions.AUTHENTICATE_FAILURE:
//       return {
//         ...state,
//         user: null,
//         loading: false,
//         error: action.payload
//       };
//     case AuthActions.CLEAR_ERROR:
//       return {
//         ...state,
//         error: null
//       };
//     case AuthActions.LOGOUT:
//       return {
//         ...state,
//         user: null,
//         error: null
//       };

//     default:
//       return state;
//   }
// }
