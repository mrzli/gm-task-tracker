import { exampleReducer } from '../example-slice';
import { authReducer } from '../auth-slice';
import { taskReducer } from '../task-slice';
import { uiNotificationReducer } from '../ui-notification-slice';

export function createAppReducer() {
  return {
    example: exampleReducer,
    auth: authReducer,
    task: taskReducer,
    uiNotification: uiNotificationReducer,
  };
}
