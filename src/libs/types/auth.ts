interface AuthBase {
  email: string;
  password: string;
}

export interface LoginValues extends AuthBase {}

export interface SignupValues extends AuthBase {
  nickname: string;
  passwordConfirm: string;
}
