import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export function useAppActions(createActionsFn) {
  const dispatch = useDispatch();
  return useMemo(() => createActionsFn(dispatch), [createActionsFn, dispatch]);
}
