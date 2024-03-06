import { useNavigation } from '@router/Router';

const Login = () => {
  const { navigate } = useNavigation();

  return (
    <div>
      <h1>로그인</h1>
      <p>
        로그인 기능은 없습니다.<br></br>회원가입 하시겠습니까?
      </p>
      <button onClick={() => navigate('/')}>No</button>
      <button onClick={() => navigate('/signup')}>Yes</button>
    </div>
  );
};

export default Login;
