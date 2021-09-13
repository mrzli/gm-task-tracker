import React from 'react';
import { FormTextInput } from '../../../components/shared/form/FormTextInput';
import { FormContainer } from '../../../components/shared/form/FormContainer';
import { disableArg, onSubmit } from '../../_storybook-utils/utils';

export default {
  title: 'shared/form/FormTextInput',
  component: FormTextInput,
  argTypes: {
    control: disableArg(),
  },
};

const Template = (args) => (
  <FormContainer
    onSubmit={onSubmit}
    renderChildren={(control) => <FormTextInput control={control} {...args} />}
  />
);

export const Simple = Template.bind({});
Simple.args = {
  type: 'text',
  name: 'inputField',
  label: 'Input Field',
};
