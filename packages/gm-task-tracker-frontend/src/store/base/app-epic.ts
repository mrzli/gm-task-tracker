import { combineEpics, Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppAction } from './app-action';
import { actionGenericNoop } from './generic-action';
import { AppState } from './app-state';
import { AppDependencies } from '../../app-setup/app-dependencies';
import { createExampleEpic } from '../example/example-epics';

export type AppEpic = Epic<AppAction, AppAction, AppState, AppDependencies>;

export function createAppEpic(): AppEpic {
  const combinedEpics = combineEpics<AppAction, AppAction, AppState>(
    createExampleEpic()
  );
  return (action$, store$, dependencies) =>
    combinedEpics(action$, store$, dependencies).pipe(
      catchError((error) => {
        console.error(error);
        return of(actionGenericNoop());
      })
    );
}
