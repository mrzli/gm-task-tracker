import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../../app/store/task-slice';

export function TaskMainView() {
  const authState = useSelector((appState) => appState.auth);
  const { user } = authState;
  const taskState = useSelector((appState) => appState.task);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('user', user);
    if (user) {
      dispatch(fetchTasks(user._id));
    }
  }, [user, dispatch]);

  return (
    <div>
      Tasks
      {taskState.tasks.map((task) => (
        <div key={task._id}>{task.text}</div>
      ))}
    </div>
  );
}
