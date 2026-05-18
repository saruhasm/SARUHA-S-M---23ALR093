const express = require('express');
const router = express.Router();
const notificationService = require('../services/notificationService');
router.get('/priority-notifications', async (req, res) => {
  try {
    const result = await notificationService.getPriorityNotifications();
    
    if (result.success) {
      return res.status(200).json({
        status: 'success',
        message: 'Priority notifications retrieved successfully',
        data: result.data,
        metadata: {
          total: result.total,
          valid: result.valid,
          returned: result.returned
        }
      });
    }
    
    return res.status(500).json({
      status: 'error',
      message: result.error,
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      data: []
    });
  }
});
router.get('/notifications', async (req, res) => {
  try {
    const result = await notificationService.getAllNotifications(req.query);
    
    if (result.success) {
      return res.status(200).json({
        status: 'success',
        message: 'Notifications retrieved successfully',
        data: result.data,
        pagination: result.pagination
      });
    }
    
    return res.status(500).json({
      status: 'error',
      message: result.error,
      data: [],
      pagination: {}
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      data: [],
      pagination: {}
    });
  }
});
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Notification service is running'
  });
});

module.exports = router;
