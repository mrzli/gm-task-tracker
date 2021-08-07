import { ofType, StateObservable } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  concat,
  from,
  Observable,
  ObservableInput,
  of,
  OperatorFunction,
} from 'rxjs';
import { AppAction } from './app-action';
import { AppState } from './app-state';
import { AppDependencies } from '../../setup/app-dependencies';

export type TType<T extends AppAction> = T['type'];
export type TPayload<T extends AppAction> = T['payload'];

export interface ApiRequestHandlerInputData<
  T extends AppAction,
  ApiResponseData
> {
  readonly actionType: TType<T>;
  readonly actionPending: (payload: TPayload<T>) => AppAction;
  readonly apiMethod: (payload: TPayload<T>) => Promise<ApiResponseData>;
  readonly actionFulfilled: ApiRequestFulfilledHandler<T, ApiResponseData>;
  readonly actionRejected: (error: unknown) => AppAction;
  readonly state$: StateObservable<AppState>;
  readonly dependencies: AppDependencies;
}

export type ApiRequestFulfilledHandler<T extends AppAction, ApiResponseData> = (
  data: ApiResponseData,
  payload: TPayload<T>,
  state$: StateObservable<AppState>,
  dependencies: AppDependencies
) => AppAction;

export function apiRequestHandler<T extends AppAction, ApiResponseData>(
  input: ApiRequestHandlerInputData<T, ApiResponseData>
): OperatorFunction<AppAction, AppAction> {
  return (source$: Observable<AppAction>): Observable<AppAction> => {
    return source$.pipe<T, AppAction>(
      ofType<AppAction, TType<T>, T>(input.actionType),
      switchMap<T, ObservableInput<AppAction>>(createSwitchMapProject(input))
    );
  };
}

type SwitchMapProject<T extends AppAction> = (
  value: T,
  index: number
) => ObservableInput<AppAction>;

function createSwitchMapProject<T extends AppAction, ApiResponseData>(
  input: ApiRequestHandlerInputData<T, ApiResponseData>
): SwitchMapProject<T> {
  return ({ payload }: T) => {
    return concat(
      of(input.actionPending(payload)),
      from(input.apiMethod(payload)).pipe(
        map((data: ApiResponseData) =>
          input.actionFulfilled(data, payload, input.state$, input.dependencies)
        ),
        catchError((error) => of(input.actionRejected(error)))
      )
    );
  };
}
