const PRIORITY_MAP = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

const parseTimestamp = (timestampStr) => {
  return new Date(timestampStr);
};
const compareNotifications = (a, b) => {
  const priorityA = PRIORITY_MAP[a.Type] || 0;
  const priorityB = PRIORITY_MAP[b.Type] || 0;
  if (priorityA !== priorityB) {
    return priorityB - priorityA;
  }
  const timeA = parseTimestamp(a.Timestamp);
  const timeB = parseTimestamp(b.Timestamp);
  
  return timeB - timeA;
};
const sortAndGetTopNotifications = (notifications, topN = 10) => {
  if (!Array.isArray(notifications)) {
    return [];
  }
  const sorted = [...notifications];
  sorted.sort(compareNotifications);
  return sorted.slice(0, topN);
};
const groupByType = (notifications) => {
  return notifications.reduce((groups, notification) => {
    const type = notification.Type || 'Unknown';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(notification);
    return groups;
  }, {});
};

module.exports = {
  sortAndGetTopNotifications,
  compareNotifications,
  groupByType,
  PRIORITY_MAP
};
