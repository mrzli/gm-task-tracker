import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppActions } from '../../../utils/hooks';
import { createTaskActions } from '../../../app/store/task/task-actions';

export function TaskMainView() {
  const taskState = useSelector((appState) => appState.task);

  const taskActions = useAppActions(createTaskActions);

  useEffect(() => {
    taskActions.getTasks();
  }, [taskActions]);

  return (
    <div>
      Tasks
      {taskState.tasks.map((task) => (
        <div key={task.id}>{task.text}</div>
      ))}
    </div>
  );
}
