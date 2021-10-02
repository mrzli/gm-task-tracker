import React from 'react';
import { SingleItemOnPage } from '../layout/SingleItemOnPage';
import { RegisterForm } from './RegisterForm';

export function RegisterMainView() {
  function onSubmit(data) {
    console.log('submit', data);
  }

  return (
    <SingleItemOnPage>
      <RegisterForm onSubmit={onSubmit} />
    </SingleItemOnPage>
  );
}
