import React, { useEffect } from 'react';
import { SingleItemOnPage } from '../layout/SingleItemOnPage';
import { LoginForm } from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  clearRedirectToHome,
  login,
  selectRedirectToHome,
} from '../../app/store/auth-slice';

export function LoginMainView() {
  const navigate = useNavigate();

  const redirectToHome = useSelector(selectRedirectToHome);

  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectToHome) {
      dispatch(clearRedirectToHome());
      navigate('/');
    }
  }, [redirectToHome, dispatch, navigate]);

  function onSubmit(data) {
    dispatch(login(data));
  }

  return (
    <SingleItemOnPage>
      <LoginForm onSubmit={onSubmit} />
    </SingleItemOnPage>
  );
}
