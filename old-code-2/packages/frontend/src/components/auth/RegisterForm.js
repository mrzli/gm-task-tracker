import React from 'react';
import PropTypes from 'prop-types';
import { useFormBuilder } from '../shared/form-builder/form-builder';
import { Box, Button } from '@mui/material';
import { z } from 'zod';

const FORM_DATA = {
  formId: 'registerForm',
  items: [
    {
      name: 'email',
      type: 'TextInput',
      data: {
        input: {
          type: 'email',
          label: 'Email',
        },
      },
    },
    {
      name: 'password',
      type: 'TextInput',
      data: {
        input: {
          type: 'password',
          label: 'Password',
        },
      },
    },
    {
      name: 'confirmPassword',
      type: 'TextInput',
      data: {
        input: {
          type: 'password',
          label: 'Confirm Password',
        },
      },
    },
  ],
  validationSchema: z
    .object({
      email: z.string().min(1).email(),
      password: z.string().min(1),
      confirmPassword: z.string().min(1),
    })
    .strict(),
};

export function RegisterForm({ onSubmit }) {
  const [form, formState] = useFormBuilder(FORM_DATA, onSubmit);

  return (
    <div>
      {form}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type={'submit'}
          variant={'contained'}
          form={FORM_DATA.formId}
          disabled={!formState.isValid}
        >
          Register
        </Button>
      </Box>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
