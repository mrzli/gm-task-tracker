import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import './FormTextInput.scss';

export function FormTextInput({ control, type, name, label, defaultValue }) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || ''}
      render={({
        field: { onChange, onBlur, value, name, ref },
        // fieldState: { invalid, isTouched, isDirty, error },
        // formState: {
        //   isDirty: formIsDirty,
        //   dirtyFields: formDirtyFields,
        //   isSubmitted: formIsSubmitted,
        //   isSubmitSuccessful: formIsSubmitSuccessful,
        //   submitCount: formSubmitCount,
        //   touchedFields: formTouchedFields,
        //   isSubmitting: formIsSubmitting,
        //   isValidating: formIsValidating,
        //   isValid: formIsValid,
        //   errors: formErrors,
        // },
      }) => {
        return (
          <TextField
            className={'form-text-input--root'}
            label={label}
            type={type || 'text'}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            InputLabelProps={{ shrink: true }}
          />
        );
      }}
    />
  );
}

FormTextInput.propTypes = {
  control: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password']),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  isPassword: PropTypes.bool,
};
