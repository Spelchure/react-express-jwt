/**
 *
 */
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from './store';
import {ApiService} from './services/api-service';
import {setIsAuth} from './features/is-auth/isAuthSlice';

export default function App() {
  const isAuth = useSelector((state: RootState) => state.isAuth);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth.isAuth || isAuth.token.length === 0) {
      navigate('/login', {replace: true});
      return;
    }
    // Fetch data.
    console.log('fetching data');
    ApiService.getProtected(isAuth.token)
      .then(response => {
        console.log('resopnse come : ', response);
        if (
          typeof response !== 'string' &&
          'status' in response &&
          response.status === 401
        ) {
          localStorage.removeItem('token');
          //setIsAuth({isAuth: false, token: ''});
        } else {
          setUserEmail((response as {email: string}).email);
        }
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, [navigate, isAuth]);

  return <h1>Hello: {userEmail}</h1>;
}
