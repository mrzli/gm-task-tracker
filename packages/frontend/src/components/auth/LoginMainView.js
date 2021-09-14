import React from 'react';
import { SingleItemOnPage } from '../layout/SingleItemOnPage';
import { LoginForm } from './LoginForm';

export function LoginMainView() {
  function onSubmit(data) {
    console.log('submit', data);
  }

  return (
    <SingleItemOnPage>
      <LoginForm onSubmit={onSubmit} />
    </SingleItemOnPage>
  );
}
