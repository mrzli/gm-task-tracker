import React, { useContext, useEffect } from 'react';
import { SingleItemOnPage } from '../layout/SingleItemOnPage';
import { LoginForm } from './LoginForm';
import { useSelector } from 'react-redux';
import { useAppActions } from '../../utils/hooks';
import { createAuthActions } from '../../app/store/auth/auth-actions';
import { AppContext } from '../../app/setup/app-context';

export function LoginMainView() {
  const context = useContext(AppContext);
  const history = context.dependencies.historyWrapper;

  const authState = useSelector((appState) => appState.auth);
  const { redirectToHome } = authState;

  const authActions = useAppActions(createAuthActions);

  useEffect(() => {
    if (redirectToHome) {
      authActions.clearRedirectToHome();
      history.push('/');
    }
  }, [redirectToHome, authActions, history]);

  function onSubmit(data) {
    authActions.login(data);
  }

  return (
    <SingleItemOnPage>
      <LoginForm onSubmit={onSubmit} />
    </SingleItemOnPage>
  );
}
