import React, { useEffect } from 'react';
import { SingleItemOnPage } from '../layout/SingleItemOnPage';
import { LoginForm } from './LoginForm';
import { useSelector } from 'react-redux';
import { useAppActions } from '../../utils/hooks';
import { createAuthActions } from '../../app/store/auth/auth-actions';
import { useNavigate } from 'react-router-dom';

export function LoginMainView() {
  const navigate = useNavigate();

  const authState = useSelector((appState) => appState.auth);
  const { redirectToHome } = authState;

  const authActions = useAppActions(createAuthActions);

  useEffect(() => {
    if (redirectToHome) {
      authActions.clearRedirectToHome();
      navigate('/');
    }
  }, [redirectToHome, authActions, navigate]);

  function onSubmit(data) {
    authActions.login(data);
  }

  return (
    <SingleItemOnPage>
      <LoginForm onSubmit={onSubmit} />
    </SingleItemOnPage>
  );
}
