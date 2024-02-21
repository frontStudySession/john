import { useNavigation } from '@router/Router';
import DefaultForm from '@components/form/DefaultForm';

const SignUp = () => {
  const { navigate } = useNavigation();

  return (
    <div>
      <h1>회원가입</h1>
      <button onClick={() => navigate('back')}>뒤로가기</button>
      <DefaultForm></DefaultForm>
    </div>
  );
};

export default SignUp;
