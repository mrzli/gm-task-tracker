import {
  DbErrorUniqueConstraintViolated,
  ValidationError,
} from './data/error-objects';

export type AnyValidationError = ValidationError;

export type AnyDbError = DbErrorUniqueConstraintViolated;

export type AnyAppError = AnyValidationError | AnyDbError;
