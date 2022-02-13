import React, { useEffect, useRef } from 'react';
import { Network } from "vis-network/peer/esm/vis-network";

import style from './style.module.css';

export const NetworkGraph = (props) => {
  const data = props.data;
  const relation = props.relation;
  const container = useRef(null);

  const options = {
    nodes: {
      shape: "ellipse",
      size: 16
    },
    edges: {
      color: {
        inherit: (relation === 'influenced') ? 'from' : 'to'
      }
    },
    interaction: {
      selectConnectedEdges: true
    },
    physics: {
      barnesHut: {
        gravitationalConstant: -15000
      }
    }
  };

  useEffect(() => {
    const network = container.current && new Network(container.current, data, options);

    network.on('select', properties => {
      const nodesToUpdate = [];
      const edgesToUpdate = [];
      const selectedNodeIds = properties.nodes;

      if (properties.nodes.length === 0) {
        data.nodes.forEach(node => {
          if (node.hidden) {
            nodesToUpdate.push({
              ...node,
              hidden: false
            });
          }
        });

        data.edges.forEach(edge => {
          if (edge.hidden) {
            edgesToUpdate.push({
              ...edge,
              hidden: false
            });
          }
        });
      } else {
        data.nodes.forEach(node => {
          nodesToUpdate.push({
            ...node,
            hidden: true
          });
        });

        data.nodes.forEach(node => {
          if (selectedNodeIds.includes(node.id)) {
            const connectedNodeIds = network.getConnectedNodes(node.id, 'to');

            connectedNodeIds.forEach(connectedNodeId => {
              nodesToUpdate.push({
                id: connectedNodeId,
                hidden: false
              });
            });

            nodesToUpdate.push({
              id: node.id,
              hidden: false
            });

            connectedNodeIds.forEach(connectedNodeId => {
              const connectedChildrenNodeIds = network.getConnectedNodes(connectedNodeId, 'to');

              connectedChildrenNodeIds.forEach(connectedChildrenNodeId => {
                if (connectedNodeIds.includes(connectedChildrenNodeId) || connectedChildrenNodeId === node.id) {
                  data.edges.forEach(edge => {
                    if (edge.from === connectedNodeId && (edge.to === connectedChildrenNodeId || edge.to === node.id)) {
                      edgesToUpdate.push({
                        ...edge,
                        hidden: true
                      });
                    }
                  });
                } else {
                  nodesToUpdate.push({
                    id: connectedChildrenNodeId,
                    hidden: true
                  });
                }
              });
            });
          }
        });
      }

      data.nodes.update(nodesToUpdate);
      data.edges.update(edgesToUpdate);
    });
  }, [container, data]);

  return (
    <div
      ref={container}
      className={style.container}
    />
  );
};
