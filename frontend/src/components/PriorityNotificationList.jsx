import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import NotificationCard from './NotificationCard';
const PriorityNotificationList = ({
  notifications = [],
  loading = false,
  error = null,
  onMarkAsRead,
  viewedNotifications = new Set()
}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ marginBottom: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <Alert severity="info">
        No priority notifications available
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
        🔴 Top Priority Notifications ({notifications.length})
      </Typography>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.ID}
          id={notification.ID}
          type={notification.Type}
          message={notification.Message}
          timestamp={notification.Timestamp}
          isRead={viewedNotifications.has(notification.ID)}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </Box>
  );
};

export default PriorityNotificationList;
