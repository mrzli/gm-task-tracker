import { AppEpic } from '../base/app-epic';
import { combineEpics } from 'redux-observable';
import { AppDependencies } from '../../app-setup/app-dependencies';
import {
  actionExampleGetPieceOfInformationFulfilled,
  actionExampleGetPieceOfInformationPending,
  actionExampleGetPieceOfInformationRejected,
  AppActionExampleGetPieceOfInformation,
} from './example-actions';
import { AppActionType } from '../base/app-action-type';
import { apiRequestHandler } from '../base/epic-utils';
import { Observable } from 'rxjs';
import { AppAction } from '../base/app-action';

const epicDashboardGetDashboardData: AppEpic = (
  action$,
  state$,
  dependencies: AppDependencies
): Observable<AppAction> => {
  return action$.pipe(
    apiRequestHandler<AppActionExampleGetPieceOfInformation, string>({
      actionType: AppActionType.ExampleGetPieceOfInformation,
      actionPending: actionExampleGetPieceOfInformationPending,
      apiMethod: dependencies.api.example.getPieceOfInformation,
      actionFulfilled: actionExampleGetPieceOfInformationFulfilled,
      actionRejected: actionExampleGetPieceOfInformationRejected,
      state$: state$,
      dependencies: dependencies,
    })
  );
};

export function createExampleEpic(): AppEpic {
  const epicList: readonly AppEpic[] = [epicDashboardGetDashboardData];
  return combineEpics(...epicList);
}
