import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import CustomTextInput from '@src/components/ui/CustomTextInput';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '@src/pages/Redux/store';
import {
  setPassword,
  setShowPassword,
  setPasswordError,
  setConfirmPasswordError,
  setIsPasswordValidated,
  setErrorMessage,
} from '@src/pages/Redux/PasswordStateSlice';

interface CustomTextInputComponentProps {}
const CustomTextInputComponent: React.FC<
  CustomTextInputComponentProps
> = () => {
  let password = useSelector(
    (state: RootState) => state.passwordState.password
  );
  let showPassword = useSelector(
    (state: RootState) => state.passwordState.showPassword
  );
  let passwordError = useSelector(
    (state: RootState) => state.passwordState.passwordError
  );
  let confirmPasswordError = useSelector(
    (state: RootState) => state.passwordState.confirmPasswordError
  );
  let isPasswordValidated = useSelector(
    (state: RootState) => state.passwordState.isPasswordValidated
  );
  let errorMessage = useSelector(
    (state: RootState) => state.passwordState.errorMessage
  );

  const unsubscribe = store.subscribe(() => {
    password = store.getState().passwordState.password;
    showPassword = store.getState().passwordState.showPassword;
    passwordError = store.getState().passwordState.passwordError;
    confirmPasswordError = store.getState().passwordState.confirmPasswordError;
    isPasswordValidated = store.getState().passwordState.isPasswordValidated;
    errorMessage = store.getState().passwordState.errorMessage;
  });

  const dispatch = useDispatch();

  const PassSchema = object({
    password: string()
      .min(8, ' must be more than 8 characters')
      .max(18, ' must be less than 18 characters'),
    passwordConfirm: string().min(1, 'Please confirm your password'),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

  const defaultValues: IPass = {
    password: '',
    passwordConfirm: '',
  };

  type IPass = TypeOf<typeof PassSchema>;

  const methods = useForm<IPass>({
    resolver: zodResolver(PassSchema),
    defaultValues,
  });

  const handleClickShowPassword = () => {
    dispatch(setShowPassword(!showPassword));
    dispatch(setPasswordError(''));
    dispatch(setConfirmPasswordError(''));
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    dispatch(setPasswordError(''));
    dispatch(setConfirmPasswordError(''));
  };

  const handleBlur = () => {
    methods.trigger();

    if (methods.formState.isValid) {
      if (
        methods.getValues().password !== methods.getValues().passwordConfirm
      ) {
        dispatch(setConfirmPasswordError('Passwords do not match'));
        dispatch(setIsPasswordValidated(false));
      } else {
        dispatch(setConfirmPasswordError(''));
        dispatch(setIsPasswordValidated(true));
      }
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

  const handleFocus = () => {
    handleBlur();
    if (methods.getValues().password !== methods.getValues().passwordConfirm) {
      dispatch(setConfirmPasswordError('Passwords do not match'));
      dispatch(setIsPasswordValidated(false));
    } else {
      dispatch(setConfirmPasswordError(''));
      dispatch(setIsPasswordValidated(true));
    }
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        error={!!passwordError}
        sx={{ marginTop: '16px' }}
      >
        <CustomTextInput
          variant="outlined"
          id="margin-normal"
          margin="normal"
          size="small"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            size="small"
            defaultValue="Password"
          >
            Password
          </InputLabel>
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
            onBlur={handleBlur}
            onFocus={handleFocus}
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
        </CustomTextInput>
      </FormControl>

      <FormControl
        variant="outlined"
        error={!!confirmPasswordError}
        sx={{ marginTop: '40px' }}
      >
        <CustomTextInput
          variant="outlined"
          error={!!confirmPasswordError}
          margin="normal"
          id="margin-normal"
        >
          <InputLabel
            size="small"
            htmlFor="outlined-adornment-confirmPassword"
            defaultValue="Password"
          >
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirmPassword"
            type={showPassword ? 'text' : 'password'}
            size="small"
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
            label="Confirm Password"
            onChange={(e) => {
              methods.setValue('passwordConfirm', e.target.value);
              methods.trigger('passwordConfirm');
            }}
            //disabled={!isPasswordValidated} // Disable initially
            onBlur={handleBlur} // Add onBlur event handler
            onFocus={handleFocus}
            error={!!confirmPasswordError}
          />
          {confirmPasswordError && (
            <FormHelperText
              className={
                confirmPasswordError
                  ? 'custom-helper-text custom-helper-text-error'
                  : 'custom-helper-text'
              }
              error
            >
              {confirmPasswordError}
            </FormHelperText>
          )}
        </CustomTextInput>
      </FormControl>
    </div>
  );
};

export default CustomTextInputComponent;
