import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export function FormRow({ children }) {
  return <Box sx={{ width: '100%', my: 3 }}>{children}</Box>;
}

FormRow.propTypes = {
  children: PropTypes.element.isRequired,
};
