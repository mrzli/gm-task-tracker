import React from 'react';
import { SingleItemOnPage } from '../../components/layout/SingleItemOnPage';
import { disableArg, PLACEHOLDER_CONTENT } from '../_storybook-utils/utils';

export default {
  title: 'Layout/SingleItemOnPage',
  component: SingleItemOnPage,
  argTypes: {
    children: disableArg(),
  },
};

const Template = (args) => (
  <SingleItemOnPage {...args}>{PLACEHOLDER_CONTENT}</SingleItemOnPage>
);

export const Simple = Template.bind({});
Simple.args = {};
