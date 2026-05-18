const fs = require('fs');
const path = require('path');
const logsDir = path.join(__dirname, '..');
const logsFilePath = path.join(logsDir, 'logs.txt');
const ensureLogsFile = () => {
  if (!fs.existsSync(logsFilePath)) {
    fs.writeFileSync(logsFilePath, '', 'utf8');
  }
};
const formatTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const loggingMiddleware = (req, res, next) => {
  try {
    ensureLogsFile();
    
    const timestamp = formatTimestamp();
    const method = req.method;
    const route = req.originalUrl;
    
    const logEntry = `[${timestamp}] ${method} ${route}\n`;
    
    fs.appendFileSync(logsFilePath, logEntry, 'utf8');
    
    next();
  } catch (error) {
    next();
  }
};

module.exports = loggingMiddleware;
