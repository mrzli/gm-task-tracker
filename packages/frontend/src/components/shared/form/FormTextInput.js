import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import './FormTextInput.scss';

export function FormTextInput({ formItem, fieldRenderInputData }) {
  const { label, type } = formItem.data.input;
  const { field, fieldState /*, formState */ } = fieldRenderInputData;
  const { onChange, onBlur, value, name, ref } = field;
  const { /* invalid, isTouched, isDirty, */ error } = fieldState;
  // const {
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
  // } = formState;
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
      error={error !== undefined}
      InputLabelProps={{ shrink: true }}
    />
  );
}

FormTextInput.propTypes = {
  formItem: PropTypes.object.isRequired,
  fieldRenderInputData: PropTypes.object.isRequired,
};
