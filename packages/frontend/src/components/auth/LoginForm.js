import React from 'react';
import PropTypes from 'prop-types';
import { useFormBuilder } from '../shared/form-builder/form-builder';
import { Box, Button } from '@mui/material';

const FORM_DATA = {
  formId: 'loginForm',
  items: [
    {
      key: 'email',
      type: 'TextInput',
      data: {
        input: {
          type: 'email',
          name: 'email',
          label: 'Email',
        },
      },
    },
    {
      key: 'password',
      type: 'TextInput',
      data: {
        input: {
          type: 'password',
          name: 'password',
          label: 'Password',
        },
      },
    },
  ],
};

export function LoginForm({ onSubmit }) {
  const form = useFormBuilder(FORM_DATA, onSubmit);
  return (
    <div>
      {form}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button type={'submit'} variant={'contained'} form={FORM_DATA.formId}>
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
