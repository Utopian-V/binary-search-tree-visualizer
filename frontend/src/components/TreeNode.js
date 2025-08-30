import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NodeContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NodeCircle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 3px solid white;
  z-index: 2;
  position: relative;
  
  &.visited {
    background: #f59e0b;
    animation: pulse 0.5s ease-in-out;
  }
  
  &.found {
    background: #10b981;
    animation: bounce 0.6s ease-in-out;
  }
  
  &.current {
    background: #3b82f6;
    animation: glow 1s ease-in-out infinite alternate;
  }
  
  &.inserted {
    background: #8b5cf6;
    animation: scaleIn 0.5s ease-out;
  }
  
  &.deleted {
    background: #ef4444;
    animation: scaleOut 0.5s ease-out;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  
  @keyframes glow {
    0% { box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
    100% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.6); }
  }
  
  @keyframes scaleIn {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }
  
  @keyframes scaleOut {
    0% { transform: scale(1); }
    100% { transform: scale(0); }
  }
`;

const ConnectionLine = styled(motion.line)`
  stroke: #64748b;
  stroke-width: 2;
  fill: none;
  opacity: 0.7;
`;

const TreeNode = ({ node, x, y, level, isAnimating, currentStep, operationSteps }) => {
  if (!node) return null;

  const getNodeState = () => {
    if (!isAnimating || !operationSteps || currentStep >= operationSteps.length) {
      return 'default';
    }

    const step = operationSteps[currentStep];
    
    if (step.current_node === node.value) {
      if (step.action === 'found' || step.action === 'insert_root' || 
          step.action === 'insert_left' || step.action === 'insert_right') {
        return 'found';
      }
      if (step.action === 'visit_node' || step.action === 'delete_visit') {
        return 'visited';
      }
      return 'current';
    }

    // Check if this node was just inserted
    if ((step.action === 'insert_left' || step.action === 'insert_right' || 
         step.action === 'insert_root') && step.value === node.value) {
      return 'inserted';
    }

    // Check if this node was just deleted
    if (step.action === 'delete_no_left' || step.action === 'delete_no_right' || 
        step.action === 'delete_two_children') {
      if (step.value === node.value) {
        return 'deleted';
      }
    }

    return 'default';
  };

  const nodeState = getNodeState();
  const nodeColor = {
    'default': '#6b7280',
    'visited': '#f59e0b',
    'found': '#10b981',
    'current': '#3b82f6',
    'inserted': '#8b5cf6',
    'deleted': '#ef4444'
  }[nodeState];

  // Calculate positions for children
  const levelHeight = 80;
  const levelWidth = Math.pow(2, level) * 100;
  const childY = y + levelHeight;
  
  const leftChildX = x - levelWidth / 2;
  const rightChildX = x + levelWidth / 2;

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <NodeContainer
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={nodeVariants}
      style={{ left: x - 25, top: y - 25 }}
    >
      {/* Connection lines to children */}
      {node.left && (
        <svg
          style={{
            position: 'absolute',
            top: 25,
            left: 25,
            width: Math.abs(leftChildX - x) + 50,
            height: levelHeight,
            zIndex: 1
          }}
        >
          <ConnectionLine
            x1="25"
            y1="25"
            x2={leftChildX - x + 25}
            y2={levelHeight - 25}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </svg>
      )}
      
      {node.right && (
        <svg
          style={{
            position: 'absolute',
            top: 25,
            left: 25,
            width: Math.abs(rightChildX - x) + 50,
            height: levelHeight,
            zIndex: 1
          }}
        >
          <ConnectionLine
            x1="25"
            y1="25"
            x2={rightChildX - x + 25}
            y2={levelHeight - 25}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </svg>
      )}

      {/* Node circle */}
      <NodeCircle
        className={nodeState}
        style={{ backgroundColor: nodeColor }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        {node.value}
      </NodeCircle>

      {/* Render children */}
      {node.left && (
        <TreeNode
          node={node.left}
          x={leftChildX}
          y={childY}
          level={level + 1}
          isAnimating={isAnimating}
          currentStep={currentStep}
          operationSteps={operationSteps}
        />
      )}
      
      {node.right && (
        <TreeNode
          node={node.right}
          x={rightChildX}
          y={childY}
          level={level + 1}
          isAnimating={isAnimating}
          currentStep={currentStep}
          operationSteps={operationSteps}
        />
      )}
    </NodeContainer>
  );
};

export default TreeNode;
