import React from 'react';
import { LoginForm } from '../../components/auth/LoginForm';
import { disableArg, onSubmit } from '../_storybook-utils/utils';

export default {
  title: 'Auth/LoginForm',
  component: LoginForm,
  argTypes: {
    onSubmit: disableArg(),
  },
};

const Template = (args) => <LoginForm {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  onSubmit,
};
