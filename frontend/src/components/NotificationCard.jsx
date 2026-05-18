import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Box,
  Typography,
  Divider
} from '@mui/material';
import { getTypeColor } from '../utils/helpers';
const NotificationCard = ({ id, type, message, timestamp, isRead, onMarkAsRead }) => {
  const handleCardClick = () => {
    if (!isRead && onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  const typeColor = getTypeColor(type);
  const backgroundColor = isRead ? 'white' : '#f5f5f5';

  return (
    <Card
      sx={{
        marginBottom: 2,
        backgroundColor: backgroundColor,
        borderLeft: isRead ? 'none' : '4px solid #2196F3',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)'
        },
        cursor: 'pointer'
      }}
      onClick={handleCardClick}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: isRead ? 400 : 600 }}>
              {message}
            </Typography>
            {!isRead && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#2196F3'
                }}
              />
            )}
          </Box>
        }
        subheader={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
            <Chip
              label={type}
              size="small"
              sx={{
                backgroundColor: typeColor,
                color: 'white',
                fontWeight: 600
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {timestamp}
            </Typography>
          </Box>
        }
        sx={{ paddingBottom: 1 }}
      />
      <Divider />
      <CardContent sx={{ paddingTop: 1 }}>
        <Typography variant="body2" color="text.secondary">
          ID: {id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
