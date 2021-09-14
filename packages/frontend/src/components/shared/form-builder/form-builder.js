import { useMemo } from 'react';
import { createContainer, asFunction, asValue, Lifetime } from 'awilix';
import { FormRow } from '../form/FormRow';
import { FormTextInput } from '../form/FormTextInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transformIfExists } from '@mrzli/gm-js-libraries-utilities/mapping';

const FORM_CONTROL_BUILDER_PREFIX = 'formControlBuilder';

export function useFormBuilder(formSchema, onSubmit) {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    resolver: transformIfExists(
      formSchema.validationSchema,
      zodResolver,
      undefined
    ),
  });

  const container = useMemo(() => createMyContainer(control), [control]);

  const form = useMemo(() => {
    console.log('redraw!!!!!');
    const formBuilder = container.resolve('formBuilder');
    return (
      <form
        id={formSchema.formId}
        onSubmit={handleSubmit(onSubmit)}
        noValidate={true}
      >
        {formBuilder.build(formSchema)}
      </form>
    );
  }, [container, formSchema, handleSubmit, onSubmit]);

  return [form, formState];
}

function createMyContainer(control) {
  const container = createContainer();

  const singleton = { lifetime: Lifetime.SINGLETON };

  container.register({
    control: asValue(control),
    formBuilder: asFunction(createFormBuilder, singleton),
    formRowBuilder: asFunction(createFormRowBuilder, singleton),
    [`${FORM_CONTROL_BUILDER_PREFIX}TextInput`]: asFunction(
      createFormControlBuilderTextInput,
      singleton
    ),
  });

  return container;
}

export function createFormBuilder(cradle) {
  return {
    build: (formSchema) => {
      return formSchema.items.map((formItem) => {
        const itemBuilder =
          cradle[`${FORM_CONTROL_BUILDER_PREFIX}${formItem.type}`];
        const rowBuilder = cradle.formRowBuilder;
        return rowBuilder.build(formItem, itemBuilder);
      });
    },
  };
}

function createFormRowBuilder({ control }) {
  return {
    build: (formItem, itemBuilder) => {
      return (
        <FormRow
          key={formItem.name}
          control={control}
          formItem={formItem}
          renderControl={(formItem, fieldRenderInputData) =>
            itemBuilder.build(formItem, fieldRenderInputData)
          }
        />
      );
    },
  };
}

function createFormControlBuilderTextInput() {
  return {
    build: (formItem, fieldRenderInputData) => {
      return (
        <FormTextInput
          formItem={formItem}
          fieldRenderInputData={fieldRenderInputData}
        />
      );
    },
  };
}
