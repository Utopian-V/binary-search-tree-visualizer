import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TreeNode from './TreeNode';

const TreeContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  background: #f8fafc;
  border-radius: 15px;
  border: 2px solid #e2e8f0;
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  font-size: 1.2rem;
  font-weight: 500;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border: 3px dashed #cbd5e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 2rem;
`;

const LoadingOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 15px;
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
`;

const OperationInfo = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 5;
`;

const BSTVisualizer = ({ treeState, operationSteps, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (operationSteps && operationSteps.length > 0) {
      setIsAnimating(true);
      setCurrentStep(0);
      
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= operationSteps.length - 1) {
            setIsAnimating(false);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [operationSteps]);

  const renderTree = () => {
    if (!treeState || !treeState.root) {
      return (
        <EmptyState
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyIcon>🌳</EmptyIcon>
          <div>Tree is empty</div>
          <div style={{ fontSize: '0.9rem', marginTop: '10px', opacity: 0.7 }}>
            Insert some values to start visualizing
          </div>
        </EmptyState>
      );
    }

    return (
      <TreeNode
        node={treeState.root}
        x={400}
        y={50}
        level={0}
        isAnimating={isAnimating}
        currentStep={currentStep}
        operationSteps={operationSteps}
      />
    );
  };

  const getCurrentOperationInfo = () => {
    if (!operationSteps || currentStep >= operationSteps.length) return null;
    
    const step = operationSteps[currentStep];
    const actionMessages = {
      'insert_root': `Inserting ${step.value} as root`,
      'insert_left': `Inserting ${step.value} as left child of ${step.parent}`,
      'insert_right': `Inserting ${step.value} as right child of ${step.parent}`,
      'traverse_left': `Traversing left from ${step.current_node}`,
      'traverse_right': `Traversing right from ${step.current_node}`,
      'duplicate_found': `Value ${step.value} already exists`,
      'visit_node': `Visiting node ${step.current_node}`,
      'found': `Found value ${step.value}`,
      'not_found': `Value ${step.value} not found`,
      'delete_visit': `Visiting node ${step.current_node} for deletion`,
      'delete_no_left': `Deleting ${step.value}, replacing with right child`,
      'delete_no_right': `Deleting ${step.value}, replacing with left child`,
      'delete_two_children': `Deleting ${step.value}, replacing with successor ${step.successor}`,
      'delete_not_found': `Value ${step.value} not found for deletion`
    };

    return actionMessages[step.action] || step.action;
  };

  return (
    <TreeContainer>
      <AnimatePresence>
        {isLoading && (
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </LoadingOverlay>
        )}
      </AnimatePresence>

      {isAnimating && operationSteps && (
        <OperationInfo
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {getCurrentOperationInfo()}
        </OperationInfo>
      )}

      {renderTree()}
    </TreeContainer>
  );
};

export default BSTVisualizer;
