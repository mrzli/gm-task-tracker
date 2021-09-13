import { useMemo } from 'react';
import { createContainer, asFunction, asValue, Lifetime } from 'awilix';
import { FormRow } from '../form/FormRow';
import { FormTextInput } from '../form/FormTextInput';
import { useForm } from 'react-hook-form';

const FORM_CONTROL_BUILDER_PREFIX = 'formControlBuilder';

export function useFormBuilder(formSchema, onSubmit) {
  const { control, handleSubmit } = useForm();

  const container = useMemo(() => createMyContainer(control), [control]);

  return useMemo(() => {
    console.log('redraw!!!!!');
    const formBuilder = container.resolve('formBuilder');
    return (
      <form id={formSchema.formId} onSubmit={handleSubmit(onSubmit)}>
        {formBuilder.build(formSchema)}
      </form>
    );
  }, [formSchema, handleSubmit, onSubmit, container]);
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
        return rowBuilder.build(formItem.key, itemBuilder.build(formItem.data));
      });
    },
  };
}

function createFormRowBuilder() {
  return {
    build: (key, wrappedComponent) => {
      return <FormRow key={key}>{wrappedComponent}</FormRow>;
    },
  };
}

function createFormControlBuilderTextInput({ control }) {
  return {
    build: (data) => {
      return <FormTextInput control={control} {...data.input} />;
    },
  };
}
