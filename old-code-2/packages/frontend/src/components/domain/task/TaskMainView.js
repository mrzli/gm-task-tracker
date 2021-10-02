import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectTasks } from '../../../app/store/task-slice';
import { selectUser } from '../../../app/store/auth-slice';

export function TaskMainView() {
  const user = useSelector(selectUser);
  const tasks = useSelector(selectTasks);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('user', user);
    if (user) {
      dispatch(fetchTasks(user._id));
    }
  }, [user, dispatch]);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>{task.text}</div>
      ))}
    </div>
  );
}
