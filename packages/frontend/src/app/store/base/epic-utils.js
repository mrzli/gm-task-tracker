import { ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { concat, from, of } from 'rxjs';

export function apiRequestHandler(input) {
  return (source$) => {
    return source$.pipe(
      ofType(input.actionType),
      switchMap(createSwitchMapProject(input))
    );
  };
}

function createSwitchMapProject(input) {
  return ({ payload }) => {
    return concat(
      of(input.actionPending(payload)),
      from(input.apiMethod(payload)).pipe(
        map((data) =>
          input.actionFulfilled(data, payload, input.state$, input.dependencies)
        ),
        catchError((error) => of(input.actionRejected(error)))
      )
    );
  };
}
