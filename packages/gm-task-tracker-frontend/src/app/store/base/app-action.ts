import { AppActionExample } from '../example/example-actions';
import { AppActionGeneric } from './generic-action';

export type AppAction = AppActionGeneric | AppActionExample;
