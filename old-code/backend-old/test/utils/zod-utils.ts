import { AnyObject } from '@mrzli/gm-js-libraries-utilities/types';
import { AppErrorType } from '../../src/utils/errors/enums/app-error-type';
import {
  StringValidation,
  undefined,
  ZodCustomIssue,
  ZodInvalidStringIssue,
  ZodIssue,
  ZodIssueCode,
  ZodTooBigIssue,
  ZodTooSmallIssue,
  ZodUnrecognizedKeysIssue,
} from 'zod';
import { ZodInvalidTypeIssue } from 'zod/lib/ZodError';
import { ZodParsedType } from 'zod/lib/helpers/parseUtil';
import { AnyValidationError } from '../../src/utils/errors/error-unions';

interface Example {
  readonly input: AnyObject;
  readonly expected: AnyValidationError;
}

export function createRequiredStringExamples(
  field: string,
  minimum: number,
  maximum: number,
  underMinAdditionalZodIssues: readonly ZodIssue[],
  overMaxAdditionalZodIssues: readonly ZodIssue[]
): readonly Example[] {
  return [
    createExampleWantStringButUndefined(field),
    createExampleWantStringButNull(field),
    createExampleWantStringMinimumLength(
      field,
      'a'.repeat(minimum - 1),
      minimum,
      underMinAdditionalZodIssues
    ),
    createExampleWantStringMaximumLength(
      field,
      'a'.repeat(maximum + 1),
      maximum,
      overMaxAdditionalZodIssues
    ),
    createExampleInvalidType(
      field,
      { value: 'this is not a string' },
      'string',
      'object'
    ),
  ];
}

export function createExampleWantStringButUndefined(field: string): Example {
  return createExample(field, undefined, [
    {
      ...createZodIssueInvalidType(field, 'string', 'undefined'),
      message: 'Required',
    },
  ]);
}

export function createExampleWantStringButNull(field: string): Example {
  return createExampleInvalidType(field, null, 'string', 'null');
}

export function createExampleWantStringMinimumLength(
  field: string,
  receivedValue: string,
  minimum: number,
  additionalZodIssues: readonly ZodIssue[]
): Example {
  return createExample(field, receivedValue, [
    createZodIssueTooSmall(field, 'string', minimum),
    ...additionalZodIssues,
  ]);
}

export function createExampleWantStringMaximumLength(
  field: string,
  receivedValue: string,
  maximum: number,
  additionalZodIssues: readonly ZodIssue[]
): Example {
  return createExample(field, receivedValue, [
    createZodIssueTooBig(field, 'string', maximum),
    ...additionalZodIssues,
  ]);
}

export function createExampleInvalidType(
  field: string,
  receivedValue: any, // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  expectedType: ZodParsedType,
  receivedType: ZodParsedType
): Example {
  return createExample(field, receivedValue, [
    createZodIssueInvalidType(field, expectedType, receivedType),
  ]);
}

export function createExampleInvalidString(
  field: string,
  receivedValue: string,
  validation: StringValidation
): Example {
  return createExample(field, receivedValue, [
    createZodIssueInvalidString(field, validation),
  ]);
}

export function createExampleCustomError(
  field: string,
  receivedValue: any, // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  message: string
): Example {
  return createExample(field, receivedValue, [
    createZodIssueCustom(field, message),
  ]);
}

function createExample(
  field: string,
  receivedValue: any, // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  zodIssues: readonly ZodIssue[]
): Example {
  return {
    input: {
      [field]: receivedValue,
    },
    expected: {
      appErrorType: AppErrorType.Validation,
      zodIssues,
    },
  };
}

export function createZodIssueInvalidType(
  field: string,
  expectedType: ZodParsedType,
  receivedType: ZodParsedType
): ZodInvalidTypeIssue & ZodIssue {
  return {
    code: ZodIssueCode.invalid_type,
    expected: expectedType,
    received: receivedType,
    path: [field],
    message: `Expected ${expectedType}, received ${receivedType}`,
  };
}

export function createZodIssueInvalidString(
  field: string,
  validation: StringValidation
): ZodInvalidStringIssue & ZodIssue {
  return {
    code: ZodIssueCode.invalid_string,
    validation,
    path: [field],
    message: `Invalid ${validation}`,
  };
}

export function createZodIssueTooSmall(
  field: string,
  type: ZodTooSmallIssue['type'],
  minimum: number
): ZodTooSmallIssue & ZodIssue {
  return {
    code: ZodIssueCode.too_small,
    inclusive: true,
    message: `Should be at least ${minimum} characters`,
    minimum,
    path: [field],
    type,
  };
}

export function createZodIssueTooBig(
  field: string,
  type: ZodTooBigIssue['type'],
  maximum: number
): ZodTooBigIssue & ZodIssue {
  return {
    code: ZodIssueCode.too_big,
    inclusive: true,
    message: `Should be at most ${maximum} characters long`,
    maximum,
    path: [field],
    type,
  };
}

export function createZodIssueUnrecognizedKeys(
  unrecognizedField: string
): ZodUnrecognizedKeysIssue & ZodIssue {
  return {
    code: ZodIssueCode.unrecognized_keys,
    keys: [unrecognizedField],
    message: `Unrecognized key(s) in object: '${unrecognizedField}'`,
    path: [],
  };
}

export function createZodIssueCustom(
  field: string,
  message: string
): ZodCustomIssue & ZodIssue {
  return {
    code: ZodIssueCode.custom,
    message,
    path: [field],
  };
}

export function createZodIssueCustomNoField(
  message: string
): ZodCustomIssue & ZodIssue {
  return {
    code: ZodIssueCode.custom,
    message,
    path: [],
  };
}
