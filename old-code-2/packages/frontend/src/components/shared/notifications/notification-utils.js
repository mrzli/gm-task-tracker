// notification:
// - id: string
// - severity: NotificationSeverity
// - message: string
// - status: NotificationStatus

import { nanoid } from '@reduxjs/toolkit';
import { NotificationStatus } from './notification-status';

export function createNotificationData(severity, message) {
  return {
    id: nanoid(12),
    severity,
    message,
    status: NotificationStatus.pending,
  };
}
