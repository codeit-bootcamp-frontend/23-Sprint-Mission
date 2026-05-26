import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '../../assets/logo/logo.svg';
import {
  AuthContainer,
  AuthSwitch,
  Form,
  LogoHomeLink,
  SubmitButton,
} from './AuthStyle';
import InputItem from '../../components/ItemUI/InputItem';
import PasswordInput from './components/PasswordInput';
import SocialLogin from './components/SocialLogin';
import { requestSignup } from '../../api/auth';
import { SignupValue } from '../../types/authTypes';

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignupValue>({
    mode: 'onChange',
  });

  const email = watch('email');
  const nickname = watch('nickname');

  const password = watch('password');
  const passwordConfirmation = watch('passwordConfirmation');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (passwordConfirmation) {
      trigger('passwordConfirmation');
    }
  }, [password, passwordConfirmation]);

  const onSubmit: SubmitHandler<SignupValue> = async (data) => {
    try {
      const trimmedData: SignupValue = {
        email: data.email.trim(),
        nickname: data.nickname.trim(),
        password: data.password.trim(),
        passwordConfirmation: data.passwordConfirmation.trim(),
      };

      await requestSignup(trimmedData);

      alert('회원가입이 완료되었습니다');
      navigate('/login');
    } catch (e: any) {
      const message =
        e.response?.data?.message || '회원가입 중 오류가 발생했습니다';

      alert(message);
    }
  };

  return (
    <AuthContainer>
      <LogoHomeLink href="/" aria-label="홈으로 이동">
        <img src={logo} alt="판다마켓 로고" />
      </LogoHomeLink>

      <Form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
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
          hasSuccess={!!email && !errors.email}
        />

        <InputItem
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          register={register('nickname', {
            required: '닉네임을 입력해 주세요',
          })}
          errorMessage={errors.nickname?.message}
          hasSuccess={!!nickname && !errors.nickname}
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
          hasSuccess={!!password && !errors.password}
        />

        <PasswordInput
          id="passwordConfirmation"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          register={register('passwordConfirmation', {
            required: '비밀번호를 다시 한 번 입력해 주세요',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다',
          })}
          errorMessage={errors.passwordConfirmation?.message}
          hasSuccess={!!passwordConfirmation && !errors.passwordConfirmation}
        />

        <SubmitButton type="submit" disabled={!isValid}>
          회원가입
        </SubmitButton>
      </Form>

      <SocialLogin />

      <AuthSwitch>
        이미 회원이신가요? <Link to="/login">로그인</Link>
      </AuthSwitch>
    </AuthContainer>
  );
};

export default SignupPage;
