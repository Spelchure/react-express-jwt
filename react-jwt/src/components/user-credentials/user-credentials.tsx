import styles from './user-credentials.module.scss';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

export type IUserCredentials = {
  usernameValidator?: (value: string) => string | undefined;
  passwordValidator?: (value: string) => string | undefined;
  isOnLoadingState?: boolean;
  onSubmit: (username: string, password: string) => void;
  registerURLPath?: string;
  variant: 'login' | 'signup';
};

export default function UserCredentials(props: IUserCredentials) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [usernameErrorText, setUsernameErrorText] = useState<
    string | undefined
  >(undefined);
  const [passwordErrorText, setPasswordErrorText] = useState<
    string | undefined
  >(undefined);
  const [retryPasswordErrorText, setRetryPasswordText] = useState<
    string | undefined
  >(undefined);

  const onUserNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (props.usernameValidator) {
      setUsernameErrorText(props.usernameValidator(event.target.value));
    }
    setUsername(event.target.value);
  };

  const onPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (props.passwordValidator) {
      setPasswordErrorText(props.passwordValidator(event.target.value));
    }
    if (event.target.value !== retryPassword) {
      setRetryPasswordText('Passwords does not match.');
    } else {
      setRetryPasswordText(undefined);
    }
    setPassword(event.target.value);
  };

  const onRetryPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value !== password) {
      setRetryPasswordText('Passwords does not match.');
    } else {
      setRetryPasswordText(undefined);
    }
    setRetryPassword(event.target.value);
  };

  return (
    <div className={styles['credentials--container']}>
      <div className={styles['credentials--container__item']}>
        <TextField
          variant="filled"
          error={!!usernameErrorText}
          helperText={usernameErrorText ? usernameErrorText : ''}
          label="Username"
          sx={{width: '100%'}}
          value={username}
          onChange={onUserNameInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles['credentials--container__item']}>
        <TextField
          variant="filled"
          label="Password"
          onChange={onPasswordInputChange}
          error={!!passwordErrorText}
          helperText={passwordErrorText ? passwordErrorText : ''}
          type="password"
          value={password}
          sx={{width: '100%'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {props.variant === 'signup' && (
        <div className={styles['credentials--container__item']}>
          <TextField
            variant="filled"
            label="Retry password"
            onChange={onRetryPasswordInputChange}
            error={!!retryPasswordErrorText}
            helperText={retryPasswordErrorText ? retryPasswordErrorText : ''}
            type="password"
            value={retryPassword}
            sx={{width: '100%'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}
      <div className={styles['credentials--container__item']}>
        {props.variant === 'login' && (
          <Link
            to={props.registerURLPath || ''}
            className={styles['credentials--container__item__text']}>
            Does not have account ? Register
          </Link>
        )}
        <LoadingButton
          loading={props.isOnLoadingState}
          disabled={
            usernameErrorText !== undefined ||
            passwordErrorText !== undefined ||
            username.length === 0 ||
            password.length === 0 ||
            (props.variant === 'signup' &&
              (retryPasswordErrorText !== undefined ||
                retryPassword.length === 0))
          }
          onClick={() => props.onSubmit(username, password)}
          className={styles['credentials--container__item__button']}
          variant="contained">
          {props.variant === 'login' ? 'Sign In' : 'Sign Up'}
        </LoadingButton>
      </div>
    </div>
  );
}
