import React from 'react';
import PropTypes from 'prop-types';
import { useFormBuilder } from '../shared/form-builder/form-builder';
import { Box, Button } from '@mui/material';
import { z } from 'zod';

const FORM_DATA = {
  formId: 'loginForm',
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
  ],
  validationSchema: z
    .object({
      email: z.string().min(1).email(),
      password: z.string().min(1),
    })
    .strict(),
};

export function LoginForm({ onSubmit }) {
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
          Login
        </Button>
      </Box>
    </div>
  );

  // return (
  //   <FormContainer
  //     onSubmit={onSubmit2}
  //     renderChildren={(control) => (
  //       <>
  //         <FormRow>
  //           <FormTextInput
  //             control={control}
  //             type={'email'}
  //             name={'email'}
  //             label={'Email'}
  //           />
  //         </FormRow>
  //         <FormRow>
  //           <FormTextInput
  //             control={control}
  //             type={'password'}
  //             name={'Password'}
  //             label={'Password'}
  //           />
  //         </FormRow>
  //       </>
  //     )}
  //   />
  // );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
