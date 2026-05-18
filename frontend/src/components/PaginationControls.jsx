import React from 'react';
import {
  Box,
  Pagination,
  Typography,
  Paper
} from '@mui/material';
const PaginationControls = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  total = 0,
  limit = 20
}) => {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <Paper
      sx={{
        padding: 2,
        marginTop: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        '@media (max-width: 600px)': {
          flexDirection: 'column'
        }
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {startItem} to {endItem} of {total} items
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', width: { xs: '100%', sm: 'auto' } }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => onPageChange(page)}
          variant="outlined"
          shape="rounded"
          disabled={totalPages <= 1}
        />
      </Box>
    </Paper>
  );
};

export default PaginationControls;
