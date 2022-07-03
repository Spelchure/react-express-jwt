import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {setIsAuth} from '../features/is-auth/isAuthSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import UserCredentials from '../components/user-credentials/user-credentials';
import * as validators from '../helpers/validators';
import {ApiService} from '../services/api-service';
import {toast} from 'react-toastify';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setIsAuth({isAuth: true, token}));
      navigate('/', {replace: true});
    }
  }, [navigate]);

  const onLoginHandler = async (username: string, password: string) => {
    setIsLoading(true);
    const response = await ApiService.login(username, password);
    // Error handling
    if (response?.status === 200) {
      if (response !== undefined) {
        const token = response.data.token as string;
        localStorage.setItem('token', response.data.token);
        dispatch(setIsAuth({isAuth: true, token}));
      }
      toast.success('Login successful.');
      setTimeout(() => navigate('/', {replace: true}), 2000);
    }
    console.log(response);
    setIsLoading(false);
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
        variant="login"
        registerURLPath="/signup"
        onSubmit={onLoginHandler}
        isOnLoadingState={isLoading}
        usernameValidator={validators.usernameValidator}
        passwordValidator={validators.passwordValidator}
      />
    </div>
  );
}
