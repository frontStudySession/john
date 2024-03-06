import { useNavigation } from '@router/Router';

const About = () => {
  const { navigate } = useNavigation();

  return (
    <div>
      <h1>소개</h1>
      <p>
        좋습니다.<br></br>리액트 라우터 만드는 중입니다.
      </p>
      <button onClick={() => navigate('/')}>홈</button>
      <button onClick={() => navigate('/about')}>소개</button>
      <button onClick={() => navigate('/login')}>로그인</button>
      <button onClick={() => navigate('/signup')}>회원가입</button>
    </div>
  );
};

export default About;
