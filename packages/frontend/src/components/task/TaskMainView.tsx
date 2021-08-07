import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/store/base/app-state';
import { useAppActions } from '../../utils/hooks';
import { TaskState } from '../../app/store/task/task-state';
import { createTaskActions } from '../../app/store/task/task-actions';

export function TaskMainView(): React.ReactElement {
  const taskState = useSelector<AppState, TaskState>(
    (appState) => appState.task
  );

  const taskActions = useAppActions(createTaskActions);

  useEffect(() => {
    taskActions.getTasks();
  }, [taskActions]);

  return (
    <div>
      {taskState.tasks.map((task) => (
        <div key={task.id}>{task.text}</div>
      ))}
    </div>
  );
}
