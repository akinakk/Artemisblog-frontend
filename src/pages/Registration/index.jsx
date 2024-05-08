import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, fetchRegister } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Dj premier',
      email: 'dj@test.com',
      password: '12345',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      alert('Failed to register!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an Account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}> {/* onSubmit handler for the form */}
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Please enter your full name' })}
          className={styles.field}
          label="Full Name" fullWidth />

        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Please enter your email' })}
          className={styles.field}
          label="E-Mail" fullWidth />

        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          {...register('password', { required: 'Please enter your password' })}
          className={styles.field}
          label="Password" fullWidth />

        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth> {/* "Register" Button inside the form */}
          Register
        </Button>
      </form>
    </Paper>
  );
};
