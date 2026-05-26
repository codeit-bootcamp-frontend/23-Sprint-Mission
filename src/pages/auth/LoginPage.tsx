import { useEffect } from 'react';
import logo from '../../assets/logo/logo.svg';
import {
  AuthContainer,
  AuthSwitch,
  Form,
  LogoHomeLink,
  SubmitButton,
} from './AuthStyle';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';
import InputItem from '../../components/ItemUI/InputItem';
import PasswordInput from './components/PasswordInput';
import { requestLogin } from '../../api/auth';
import { LoginValue } from '../../types/authTypes';
import { SubmitHandler, useForm } from 'react-hook-form';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValue>({
    mode: 'onChange',
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<LoginValue> = async (data) => {
    try {
      const trimmedData: LoginValue = {
        email: data.email.trim(),
        password: data.password.trim(),
      };

      const result = await requestLogin(trimmedData);
      console.log('로그인 응답', result);

      localStorage.setItem('accessToken', result.accessToken);

      navigate('/');
    } catch (e: any) {
      const message =
        e.response?.data?.message || '이메일 또는 비밀번호가 일치하지 않습니다';

      alert(message);
    }
  };

  return (
    <AuthContainer>
      <LogoHomeLink href="/" aria-label="홈으로 이동">
        <img src={logo} alt="판다마켓 로고" />
      </LogoHomeLink>

      <Form id="loginForm" method="post" onSubmit={handleSubmit(onSubmit)}>
        <InputItem
          id="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          register={register('email', {
            required: '이메일을 입력해 주세요',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: '잘못된 이메일 형식입니다',
            },
          })}
          errorMessage={errors.email?.message}
        />

        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          register={register('password', {
            required: '비밀번호를 입력해 주세요',
            minLength: {
              value: 8,
              message: '비밀번호를 8자 이상 입력해 주세요',
            },
          })}
          errorMessage={errors.password?.message}
        />

        <SubmitButton type="submit" disabled={!isValid}>
          로그인
        </SubmitButton>
      </Form>

      <SocialLogin />

      <AuthSwitch>
        판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
      </AuthSwitch>
    </AuthContainer>
  );
};

export default LoginPage;
