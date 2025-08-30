import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Panel = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled(motion.button)`
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &.inorder {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    }
  }
  
  &.preorder {
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #0891b2, #0e7490);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
    }
  }
  
  &.postorder {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #d97706, #b45309);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }
  }
  
  &.levelorder {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #059669, #047857);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
  }
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
`;

const ResultItem = styled.div`
  margin-bottom: 15px;
`;

const ResultLabel = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: #374151;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const ResultValues = styled(motion.div)`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85rem;
  color: #475569;
  min-height: 40px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const ValueTag = styled(motion.span)`
  background: #e0e7ff;
  color: #3730a3;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.8rem;
`;

const EmptyState = styled.div`
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  padding: 20px;
`;

const TraversalPanel = ({ onTraversal, results }) => {
  const handleTraversal = (type) => {
    onTraversal(type);
  };

  const renderResult = (type, values) => {
    if (!values || values.length === 0) {
      return <EmptyState>No traversal performed yet</EmptyState>;
    }

    return (
      <ResultValues
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {values.map((value, index) => (
          <ValueTag
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            {value}
          </ValueTag>
        ))}
      </ResultValues>
    );
  };

  return (
    <Panel
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Title>Tree Traversals</Title>
      
      <ButtonGroup>
        <Button
          className="inorder"
          onClick={() => handleTraversal('inorder')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Inorder
        </Button>
        <Button
          className="preorder"
          onClick={() => handleTraversal('preorder')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Preorder
        </Button>
      </ButtonGroup>
      
      <ButtonGroup>
        <Button
          className="postorder"
          onClick={() => handleTraversal('postorder')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Postorder
        </Button>
        <Button
          className="levelorder"
          onClick={() => handleTraversal('levelorder')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Level Order
        </Button>
      </ButtonGroup>
      
      <ResultsContainer>
        <ResultItem>
          <ResultLabel>Inorder (L-Root-R)</ResultLabel>
          {renderResult('inorder', results.inorder)}
        </ResultItem>
        
        <ResultItem>
          <ResultLabel>Preorder (Root-L-R)</ResultLabel>
          {renderResult('preorder', results.preorder)}
        </ResultItem>
        
        <ResultItem>
          <ResultLabel>Postorder (L-R-Root)</ResultLabel>
          {renderResult('postorder', results.postorder)}
        </ResultItem>
        
        <ResultItem>
          <ResultLabel>Level Order (BFS)</ResultLabel>
          {renderResult('levelorder', results.levelorder)}
        </ResultItem>
      </ResultsContainer>
    </Panel>
  );
};

export default TraversalPanel;
