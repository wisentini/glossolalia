import React, { useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const Menu = () => {
  const [relation, setRelation] = useState(null);

  const handleChange = (event) => {
    setRelation(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 160 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Relation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={relation}
          label="Relation"
          onChange={handleChange}
        >
          <MenuItem value={10}>Influenced</MenuItem>
          <MenuItem value={20}>Influenced by</MenuItem>
          <MenuItem value={30}>Timeline</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
