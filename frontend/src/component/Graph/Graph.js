import React, { useEffect, useRef } from 'react';
import { Network } from "vis-network/peer/esm/vis-network";

import style from './style.module.css';

export const Graph = (props) => {
  const nodes = props.nodes;
  const edges = props.edges;
  const options = props.options;

  const container = useRef(null);

  useEffect(() => {
    const network = container.current && new Network(container.current, { nodes, edges }, options);
  }, [container, nodes, edges, options]);

  return (
    <div
      ref={container}
      className={style.container}
    />
  );
};
