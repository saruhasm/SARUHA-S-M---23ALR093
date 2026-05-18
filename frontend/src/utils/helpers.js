/**
 * Helper Functions for Frontend
 */

/**
 * Gets color for notification type badge
 * @param {string} type - Notification type
 * @returns {string} - Color code
 */
export const getTypeColor = (type) => {
  const colors = {
    'Placement': '#FF6B6B',    // Red - Highest priority
    'Result': '#4ECDC4',       // Teal - Medium priority
    'Event': '#95E1D3'         // Light green - Lowest priority
  };
  return colors[type] || '#9C27B0';  // Default purple
};

/**
 * Manages localStorage for viewed notifications
 */
export const StorageManager = {
  /**
   * Gets all viewed notification IDs
   * @returns {Set} - Set of viewed notification IDs
   */
  getViewedNotifications: () => {
    try {
      const stored = localStorage.getItem('viewedNotifications');
      return new Set(stored ? JSON.parse(stored) : []);
    } catch (error) {
      return new Set();
    }
  },

  /**
   * Marks notification as viewed
   * @param {string} notificationId - ID to mark as viewed
   */
  markAsViewed: (notificationId) => {
    try {
      const viewed = StorageManager.getViewedNotifications();
      viewed.add(notificationId);
      localStorage.setItem('viewedNotifications', JSON.stringify(Array.from(viewed)));
    } catch (error) {
      // Silently fail if storage is unavailable
    }
  },

  /**
   * Clears all viewed notifications
   */
  clearViewed: () => {
    try {
      localStorage.removeItem('viewedNotifications');
    } catch (error) {
      // Silently fail if storage is unavailable
    }
  }
};

/**
 * Formats timestamp for display
 * @param {string} timestamp - Timestamp string
 * @returns {string} - Formatted timestamp
 */
export const formatTimestamp = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return timestamp;
  }
};

/**
 * Gets readable notification type label
 * @param {string} type - Notification type
 * @returns {string} - Readable label
 */
export const getTypeLabel = (type) => {
  const labels = {
    'Placement': '💼 Placement',
    'Result': '📊 Result',
    'Event': '📅 Event'
  };
  return labels[type] || type;
};
