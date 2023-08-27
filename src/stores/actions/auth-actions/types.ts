import { TAuthToken, TSignInRequest } from "../../../interfaces/auth-interface";
import { EAuthActions } from "./constants";

export type TSignInAction = {
  type: EAuthActions.SIGN_IN;
  payload: TSignInRequest;
  cb1?: (payload: TAuthToken) => void;
  cb2?: (errorMessage: string) => void;
};
