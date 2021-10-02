import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export function NotificationCloseButton({ onClose }) {
  return (
    <IconButton size={'small'} color={'inherit'} onClick={onClose}>
      <Close fontSize={'small'} />
    </IconButton>
  );
}

NotificationCloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};
