import axios from "../utils/axios";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: number | string;
    email: string;
    nickname: string;
  };
}

export const signIn = async (
  body: SignInRequest
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>("/auth/signIn", body);
  return data;
};

export const signUp = async (
  body: SignUpRequest
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>("/auth/signUp", body);
  return data;
};