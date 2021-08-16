import { AppErrorType } from '../enums/app-error-type';
import { AppErrorTypeDb } from '../enums/app-error-type-db';
import { ZodIssue } from 'zod';

export interface AppError {
  readonly appErrorType: AppErrorType;
}

export interface ValidationError extends AppError {
  readonly appErrorType: AppErrorType.Validation;
  readonly zodIssues: readonly ZodIssue[];
}

export interface DbError extends AppError {
  readonly appErrorType: AppErrorType.Db;
  readonly dbErrorType: AppErrorTypeDb;
}

export interface DbErrorUniqueConstraintViolated extends DbError {
  readonly dbErrorType: AppErrorTypeDb.UniqueConstraintViolated;
  readonly model: string;
  readonly field: string;
}
