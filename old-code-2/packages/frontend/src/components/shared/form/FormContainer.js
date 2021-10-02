import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

export function FormContainer({ onSubmit, renderChildren }) {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>{renderChildren(control)}</form>
  );
}

FormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  renderChildren: PropTypes.func.isRequired,
};
