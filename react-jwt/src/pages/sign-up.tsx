import UserCredentials from '../components/user-credentials/user-credentials';
import * as validators from '../helpers/validators';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {setIsAuth} from '../features/is-auth/isAuthSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {ApiService} from '../services/api-service';
import {toast} from 'react-toastify';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {}, [navigate]);

  const onSignupHandler = async (username: string, password: string) => {
    setIsLoading(true);
    const response = await ApiService.signUp(username, password);
    // Error handling
    if (response?.status === 201) {
      toast.success('Signup successful.');
      navigate('/login', {replace: true});
    }
    console.log(response);
    setIsLoading(false);
    // fetch
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
      <UserCredentials
        variant="signup"
        onSubmit={onSignupHandler}
        isOnLoadingState={isLoading}
        usernameValidator={validators.usernameValidator}
        passwordValidator={validators.passwordValidator}
      />
    </div>
  );
}
