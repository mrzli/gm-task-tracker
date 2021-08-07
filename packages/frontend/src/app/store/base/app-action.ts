import { AppActionExample } from '../example/example-actions';
import { AppActionGeneric } from './generic-action';
import { AppActionTask } from '../task/task-actions';

export type AppAction = AppActionGeneric | AppActionExample | AppActionTask;
