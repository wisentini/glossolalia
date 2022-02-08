import React from 'react';

import style from './style.module.css';

export const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        glossolalia
      </div>
      <div className={style.subtitle}>
        Programming languages visualization.
      </div>
    </div>
  );
};
