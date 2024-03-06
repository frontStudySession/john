import { useNavigation } from '@router/Router';

const Home = () => {
  const { navigate } = useNavigation();

  return (
    <div>
      <h1>홈</h1>
      <p>
        존입니다.<br></br>무엇을 도와드릴까요.
      </p>
      <button onClick={() => navigate('/')}>홈</button>
      <button onClick={() => navigate('/about')}>소개</button>
      <button onClick={() => navigate('/login')}>로그인</button>
      <button onClick={() => navigate('/signup')}>회원가입</button>
    </div>
  );
};

export default Home;
