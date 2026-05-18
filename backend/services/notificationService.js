const axios = require('axios');
const { sortAndGetTopNotifications } = require('../utils/prioritySorter');
const EXTERNAL_API_URL = 'http://4.224.186.213/evaluation-service/notifications';
const TIMEOUT = 10000; 
const MOCK_NOTIFICATIONS = [
  {
    "ID": "1001",
    "Type": "Placement",
    "Message": "Google Summer Internship 2026 - Apply Now!",
    "Timestamp": "2026-05-18 14:30:00"
  },
  {
    "ID": "1002",
    "Type": "Placement",
    "Message": "Microsoft Hiring for SDET Positions",
    "Timestamp": "2026-05-18 14:15:00"
  },
  {
    "ID": "1003",
    "Type": "Placement",
    "Message": "Amazon FTE - Software Development Engineer",
    "Timestamp": "2026-05-18 13:45:00"
  },
  {
    "ID": "1004",
    "Type": "Placement",
    "Message": "Goldman Sachs Engineering Internship",
    "Timestamp": "2026-05-18 13:20:00"
  },
  {
    "ID": "1005",
    "Type": "Result",
    "Message": "Semester 5 Results Published - Check Portal",
    "Timestamp": "2026-05-18 10:00:00"
  },
  {
    "ID": "1006",
    "Type": "Result",
    "Message": "Final Exam Results Available",
    "Timestamp": "2026-05-17 16:30:00"
  },
  {
    "ID": "1007",
    "Type": "Result",
    "Message": "Quiz 3 Grades Released",
    "Timestamp": "2026-05-17 14:15:00"
  },
  {
    "ID": "1008",
    "Type": "Event",
    "Message": "Tech Symposium - Register Now (Limited Seats)",
    "Timestamp": "2026-05-18 12:00:00"
  },
  {
    "ID": "1009",
    "Type": "Event",
    "Message": "Cricket Match This Weekend - 5 PM",
    "Timestamp": "2026-05-17 11:20:00"
  },
  {
    "ID": "1010",
    "Type": "Event",
    "Message": "Freshers Orientation Starting Tomorrow",
    "Timestamp": "2026-05-16 15:45:00"
  },
  {
    "ID": "1011",
    "Type": "Placement",
    "Message": "JPMorgan Chase - Trading Program",
    "Timestamp": "2026-05-15 09:30:00"
  },
  {
    "ID": "1012",
    "Type": "Event",
    "Message": "Coding Competition - Prize Money 50K",
    "Timestamp": "2026-05-14 13:00:00"
  },
  {
    "ID": "1013",
    "Type": "Result",
    "Message": "Continuous Assessment Marks Updated",
    "Timestamp": "2026-05-13 10:30:00"
  },
  {
    "ID": "1014",
    "Type": "Event",
    "Message": "IEEE Technical Workshop - Free Entry",
    "Timestamp": "2026-05-12 16:45:00"
  },
  {
    "ID": "1015",
    "Type": "Placement",
    "Message": "TCS On-Campus Drive - Register Before May 20",
    "Timestamp": "2026-05-11 11:00:00"
  }
];
const fetchNotificationsFromAPI = async () => {
  try {
    const response = await axios.get(EXTERNAL_API_URL, {
      timeout: TIMEOUT
    });
    
    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data;
    }
    
    throw new Error('Invalid response format from external API');
  } catch (error) {
    return MOCK_NOTIFICATIONS;
  }
};
const isValidNotification = (notification) => {
  return (
    notification &&
    typeof notification === 'object' &&
    notification.ID &&
    notification.Type &&
    notification.Message &&
    notification.Timestamp
  );
};
const filterValidNotifications = (notifications) => {
  return notifications.filter(isValidNotification);
};
const getPriorityNotifications = async () => {
  try {
    const allNotifications = await fetchNotificationsFromAPI();
    const validNotifications = filterValidNotifications(allNotifications);
    const topNotifications = sortAndGetTopNotifications(validNotifications, 10);
    return {
      success: true,
      data: topNotifications,
      total: allNotifications.length,
      valid: validNotifications.length,
      returned: topNotifications.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};
const getAllNotifications = async (options = {}) => {
  try {
    const limit = Math.min(parseInt(options.limit) || 20, 100);
    const page = Math.max(parseInt(options.page) || 1, 1);
    const notificationType = options.notification_type;
    const allNotifications = await fetchNotificationsFromAPI();
    let validNotifications = filterValidNotifications(allNotifications);
    if (notificationType) {
      validNotifications = validNotifications.filter(
        n => n.Type === notificationType
      );
    }
    const sorted = [...validNotifications].sort((a, b) => {
      const priorityMap = { 'Placement': 3, 'Result': 2, 'Event': 1 };
      const priorityA = priorityMap[a.Type] || 0;
      const priorityB = priorityMap[b.Type] || 0;
      
      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }
      
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });
    const totalPages = Math.ceil(sorted.length / limit);
    const skip = (page - 1) * limit;
    const paginatedData = sorted.slice(skip, skip + limit);
    
    return {
      success: true,
      data: paginatedData,
      pagination: {
        total: sorted.length,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: [],
      pagination: {}
    };
  }
};

module.exports = {
  fetchNotificationsFromAPI,
  filterValidNotifications,
  isValidNotification,
  getPriorityNotifications,
  getAllNotifications
};
