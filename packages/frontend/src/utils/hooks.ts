import { Dispatch } from 'redux';
import { AppActionBase } from '../app/store/base/app-action-base';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { AppActionType } from '../app/store/base/app-action-type';

export function useAppActions<TActionContainer>(
  createActionsFn: (
    dispatch: Dispatch<AppActionBase<AppActionType, unknown>>
  ) => TActionContainer
): TActionContainer {
  const dispatch =
    useDispatch<Dispatch<AppActionBase<AppActionType, unknown>>>();
  return useMemo<TActionContainer>(
    () => createActionsFn(dispatch),
    [createActionsFn, dispatch]
  );
}
