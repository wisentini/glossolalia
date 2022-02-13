import React, { useEffect, useRef } from 'react';
import { Timeline } from "vis-timeline/standalone";
import { min, max } from 'lodash';

import './style.css';

export const TimelineGraph = (props) => {
  const items = props.items;
  const container = useRef(null);

  const getLowestDate = () => {
    const lowestYear = min(items.map(item => item.start.getFullYear())) - 10;
    return new Date(lowestYear, 0);
  };

  const getHighestDate = () => {
    const highestYear = max(items.map(item => item.start.getFullYear())) + 10;
    return new Date(highestYear, 0);
  };

  const options = {
    showCurrentTime: false,
    zoomMin: 1.5e+11,
    min: getLowestDate(),
    max: getHighestDate(),
    orientation: 'bottom'
  };

  useEffect(() => {
    const timeline = container.current && new Timeline(container.current, items, options);
  }, [container, items]);

  return (
    <div
      ref={container}
      className={'container'}
    />
  );
};
