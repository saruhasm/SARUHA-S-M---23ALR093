import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
const FilterBar = ({
  selectedType = 'all',
  onTypeChange,
  onRefresh,
  loading = false
}) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 3, backgroundColor: '#fafafa' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
          '@media (max-width: 600px)': {
            flexDirection: 'column'
          }
        }}
      >
        <FormControl
          sx={{
            minWidth: 200,
            '@media (max-width: 600px)': {
              width: '100%'
            }
          }}
        >
          <InputLabel>Filter by Type</InputLabel>
          <Select
            value={selectedType}
            label="Filter by Type"
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={onRefresh}
          disabled={loading}
          sx={{
            '@media (max-width: 600px)': {
              width: '100%'
            }
          }}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterBar;
