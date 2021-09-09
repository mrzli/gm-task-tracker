import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { actionGenericNoop } from './generic-action';
import { createExampleEpic } from '../example/example-epics';
import { createTaskEpic } from '../task/task-epics';

export function createAppEpic() {
  const combinedEpics = combineEpics(createExampleEpic(), createTaskEpic());
  return (action$, store$, dependencies) =>
    combinedEpics(action$, store$, dependencies).pipe(
      catchError((error) => {
        console.error(error);
        return of(actionGenericNoop());
      })
    );
}
