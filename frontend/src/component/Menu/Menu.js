import React, { useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import style from './style.module.css';

export const Menu = (props) => {
  const [relation, setRelation] = useState(props.defaultRelation);
  const handleMenuChange = props.handleMenuChange;

  const handleChange = (event) => {
    const value = event.target.value;

    if (value !== relation) {
      setRelation(value);
      handleMenuChange(value);
    }
  };

  return (
    <Box className={style.container}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Relation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={relation}
          label="Relation"
          onChange={handleChange}
        >
          <MenuItem value={'influenced'}>Influenced</MenuItem>
          <MenuItem value={'influencedBy'}>Influenced by</MenuItem>
          <MenuItem value={'timeline'}>Timeline</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
