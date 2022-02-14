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
    max: getHighestDate()
  };

  const getItemYearById = (id) => {
    const rawItems = items.get();
    const item = rawItems.find(item => item.id === id);
    return item ? item.start.getFullYear() : item;
  };

  const onSelect = (properties) => {
    const selectedItemId = properties.items.shift();
    console.log(getItemYearById(selectedItemId));
  };

  useEffect(() => {
    const timeline = container.current && new Timeline(container.current, items, options);

    timeline.on('select', onSelect);
  }, [container, items]);

  return (
    <div
      ref={container}
      className={'container'}
    />
  );
};
