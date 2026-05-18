import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Paper,
  Typography,
  Grid
} from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import PriorityNotificationList from '../components/PriorityNotificationList';
import FilterBar from '../components/FilterBar';
import PaginationControls from '../components/PaginationControls';
import { fetchPriorityNotifications, fetchNotifications } from '../services/api';
import { StorageManager, formatTimestamp, getTypeColor } from '../utils/helpers';
const Home = () => {
  const [tabValue, setTabValue] = useState(0);
  const [priorityNotifications, setPriorityNotifications] = useState([]);
  const [priorityLoading, setPriorityLoading] = useState(false);
  const [priorityError, setPriorityError] = useState(null);
  const [allNotifications, setAllNotifications] = useState([]);
  const [allLoading, setAllLoading] = useState(false);
  const [allError, setAllError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedType, setSelectedType] = useState('all');
  const [viewedNotifications, setViewedNotifications] = useState(
    StorageManager.getViewedNotifications()
  );
  const LIMIT = 10;
  const loadPriorityNotifications = async () => {
    setPriorityLoading(true);
    setPriorityError(null);
    try {
      const response = await fetchPriorityNotifications();
      if (response.status === 'success') {
        setPriorityNotifications(response.data);
      } else {
        setPriorityError(response.message || 'Failed to load priority notifications');
      }
    } catch (error) {
      setPriorityError(error.message);
    } finally {
      setPriorityLoading(false);
    }
  };
  const loadAllNotifications = async (page = 1, type = 'all') => {
    setAllLoading(true);
    setAllError(null);
    try {
      const params = {
        limit: LIMIT,
        page
      };
      
      if (type !== 'all') {
        params.notification_type = type;
      }
      
      const response = await fetchNotifications(params);
      if (response.status === 'success') {
        setAllNotifications(response.data);
        setCurrentPage(response.pagination.page);
        setTotalPages(response.pagination.totalPages);
        setTotal(response.pagination.total);
      } else {
        setAllError(response.message || 'Failed to load notifications');
      }
    } catch (error) {
      setAllError(error.message);
    } finally {
      setAllLoading(false);
    }
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      loadPriorityNotifications();
    } else {
      setCurrentPage(1);
      loadAllNotifications(1, selectedType);
    }
  };
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
    loadAllNotifications(1, type);
  };
  const handlePageChange = (page) => {
    loadAllNotifications(page, selectedType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleMarkAsRead = (notificationId) => {
    StorageManager.markAsViewed(notificationId);
    setViewedNotifications(StorageManager.getViewedNotifications());
  };
  useEffect(() => {
    loadPriorityNotifications();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingBottom: 4 }}>
      {/* Header */}
      <Paper
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: 3,
          marginBottom: 3,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>
            📢 Campus Notification System
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Stay updated with the latest campus notifications, results, and placements
          </Typography>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Tab Navigation */}
        <Paper sx={{ marginBottom: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="🔴 Priority Notifications" />
            <Tab label="📋 All Notifications" />
          </Tabs>
        </Paper>

        {/* Tab 0: Priority Notifications */}
        {tabValue === 0 && (
          <Box>
            <PriorityNotificationList
              notifications={priorityNotifications}
              loading={priorityLoading}
              error={priorityError}
              onMarkAsRead={handleMarkAsRead}
              viewedNotifications={viewedNotifications}
            />
          </Box>
        )}

        {/* Tab 1: All Notifications */}
        {tabValue === 1 && (
          <Box>
            <FilterBar
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
              onRefresh={() => loadAllNotifications(currentPage, selectedType)}
              loading={allLoading}
            />

            {allLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '200px', alignItems: 'center' }}>
                <CircularProgress />
              </Box>
            )}

            {allError && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {allError}
              </Alert>
            )}

            {!allLoading && allNotifications.length === 0 && !allError && (
              <Alert severity="info">
                No notifications found
              </Alert>
            )}

            {!allLoading && allNotifications.length > 0 && (
              <>
                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Showing {allNotifications.length} notification{allNotifications.length !== 1 ? 's' : ''}
                  </Typography>
                </Box>
                {allNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.ID}
                    id={notification.ID}
                    type={notification.Type}
                    message={notification.Message}
                    timestamp={notification.Timestamp}
                    isRead={viewedNotifications.has(notification.ID)}
                    onMarkAsRead={handleMarkAsRead}
                  />
                ))}
              </>
            )}

            {allNotifications.length > 0 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                total={total}
                limit={LIMIT}
              />
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
