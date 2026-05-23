export interface SignupValue {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface LoginValue {
  email: string;
  password: string;
}
