import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

export function FormRow({ control, formItem, renderControl }) {
  const { name, defaultValue } = formItem;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || ''}
      render={(fieldRenderInputData) => {
        const { error } = fieldRenderInputData.fieldState;
        const hasErrors = error !== undefined;
        return (
          <FormControl sx={{ width: '100%', my: 3 }} error={hasErrors}>
            {renderControl(formItem, fieldRenderInputData)}
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}

FormRow.propTypes = {
  control: PropTypes.any.isRequired,
  formItem: PropTypes.object.isRequired,
  renderControl: PropTypes.func.isRequired,
};
