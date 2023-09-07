import React from 'react';
import {
  FormControl,
  InputAdornment,
  IconButton,
  FormHelperText,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextInput from '@src/components/ui/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@src/pages/Redux/store';
import {
  setPassword,
  setShowPassword,
  setPasswordError,
  setConfirmPasswordError,
  setIsPasswordValidated,
  setErrorMessage,
} from '@src/pages/Redux/PasswordStateSlice';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';

import { Link } from 'react-router-dom';
import { Button } from '@src/components/ui/button';
import { storedPasswordIndex } from '../../../../../utils/constants';
import { hash } from '@kadena/cryptography-utils';
import { comparePasswordToHash, StoredPassword } from '@src/lib/utils';
const Login = () => {
  let password = useSelector(
    (state: RootState) => state.passwordState.password
  );
  let showPassword = useSelector(
    (state: RootState) => state.passwordState.showPassword
  );
  let passwordError = useSelector(
    (state: RootState) => state.passwordState.passwordError
  );
  let isPasswordValidated = useSelector(
    (state: RootState) => state.passwordState.isPasswordValidated
  );
  let errorMessage = useSelector(
    (state: RootState) => state.passwordState.errorMessage
  );

  const [passwordValid, setPasswordValid] = React.useState(false);

  const dispatch = useDispatch();

  const unsubscribe = store.subscribe(() => {
    password = store.getState().passwordState.password;
    isPasswordValidated = store.getState().passwordState.isPasswordValidated;
    showPassword = store.getState().passwordState.showPassword;
    passwordError = store.getState().passwordState.passwordError;
    errorMessage = store.getState().passwordState.errorMessage;
  });

  const PassSchema = object({
    password: string()
      .min(8, ' Must be more than 8 characters')
      .max(18, ' Must be less than 18 characters'),
  });

  const defaultValues: IPass = {
    password: '',
  };

  type IPass = TypeOf<typeof PassSchema>;

  const methods = useForm<IPass>({
    resolver: zodResolver(PassSchema),
    defaultValues,
  });

  const handleClickShowPassword = () => {
    dispatch(setShowPassword(!showPassword));
    dispatch(setPasswordError(''));
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    dispatch(setPasswordError(''));
  };

  const handlePasswordInput = () => {
    methods.trigger();
    dispatch(setIsPasswordValidated(true));

    if (methods.formState.isValid) {
      chrome.storage.local.get(['storedPassword']).then((result) => {
        const storedPassword = result.storedPassword;
        console.log(storedPassword);
        if (storedPassword === undefined || storedPassword === null) {
          dispatch(setErrorMessage('No stored password to compare against'));
          setPasswordValid(false);
        } else {
          const storedPasswordObj: StoredPassword = JSON.parse(storedPassword);
          if (comparePasswordToHash(password, storedPasswordObj) === true) {
            console.log('Found the correct password!');
            setPasswordValid(true);
          } else {
            setPasswordValid(false);
            console.log('Wrong password');
          }
        }
      });
    } else {
      const passwordErrors: any = methods.formState.errors?.password;
      if (passwordErrors) {
        dispatch(setPasswordError(passwordErrors.message));
        dispatch(setErrorMessage(passwordErrors.message));
        dispatch(setIsPasswordValidated(false));
      } else {
        dispatch(setPasswordError(''));
        dispatch(setErrorMessage('Minimum 8 characters'));
        dispatch(setIsPasswordValidated(false));
      }
    }
  };

  return (
    <div className="overflow-hidden bg-[#101413] flex flex-col justify-start gap-1 w-full h-[600px] items-stretch">
      <div className=" text-xl  leading-[40px] text-[#c4c7c5]  ml-4 mr-20 ">
        Login with your password
      </div>
      <FormControl variant="outlined">
        <CustomTextInput>
          <OutlinedInput
            id="outlined-adornment-password"
            size="small"
            type={showPassword ? 'text' : 'password'}
            inputProps={{
              style: {
                fontFamily: 'work sans',
                fontSize: '18px',
                fontWeight: '500',
                letterSpacing: '0.14em',
              },
              autoComplete: 'new-password',
              inputMode: 'decimal',
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            error={!!passwordError}
            onBlur={handlePasswordInput}
            onFocus={handlePasswordInput}
            onKeyDown={handlePasswordInput}
            onChange={(e) => {
              methods.setValue('password', e.target.value);
              methods.trigger('password');
              dispatch(setPassword(e.target.value));
            }}
          />
          <FormHelperText
            margin="dense"
            id="component-error-text"
            className={
              passwordError
                ? 'custom-helper-text custom-helper-text-error'
                : 'custom-helper-text'
            }
          >
            {passwordError || errorMessage}
          </FormHelperText>
          <Link to="/ashboard">
            <Button
              variant={
                isPasswordValidated && passwordValid ? 'default' : 'disabled'
              }
              size={'lg'}
            >
              Unlock
            </Button>
          </Link>
        </CustomTextInput>
      </FormControl>
    </div>
  );
};

export default Login;
