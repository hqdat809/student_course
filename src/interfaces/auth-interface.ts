export type TSignInRequest = {
  email: string;
  password: string;
};

export type TSignInResponse = {
  token: string;
  refreshToken: string;
  userData: IUserData;
};

export interface IUserData {
  id: number;
  name: string;
  age: number;
  address: string;
  email: string;
  roles: Role[];
  enabled: boolean;
  username: string;
  accountNonLocked: boolean;
  authorities: Authority[];
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
}

export interface Authority {
  authority: string;
}

export interface Role {
  id: number;
  name: string;
}

export type TAuthToken = {
  token: string;
  refreshToken: string;
};

export enum EAuthToken {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}
