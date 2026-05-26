import axiosInstance from './axiosInstance';
import { LoginValue, SignupValue } from '../types/authTypes';

export const requestSignup = async (data: SignupValue) => {
  console.log('보내는 회원가입 데이터: ', data);

  const res = await axiosInstance.post(`/auth/signUp`, data);
  return res.data;
};

export const requestLogin = async (data: LoginValue) => {
  const res = await axiosInstance.post(`/auth/signIn`, data);
  return res.data;
};
