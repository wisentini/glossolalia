import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import style from './style.module.css';

export const Loading = (props) => {
  return (
    <div className={style.container}>
      <div className={style.message}>
        Loading data...
      </div>
      <div className={style.icon}>
        <CircularProgress size={20}/>
      </div>
    </div>
  );
};
