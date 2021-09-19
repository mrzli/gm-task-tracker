import React, { useState } from 'react';
import { LoadingOverlay } from '../../../components/shared/display/LoadingOverlay';
import { disableArg } from '../../_storybook-utils/utils';

export default {
  title: 'shared/display/LoadingOverlay',
  component: LoadingOverlay,
  argTypes: {
    isOpen: disableArg(),
    onClose: disableArg(),
  },
};

const Template = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Click to Open Overlay
      </button>
      <LoadingOverlay
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const Simple = Template.bind({});
Simple.args = {};
