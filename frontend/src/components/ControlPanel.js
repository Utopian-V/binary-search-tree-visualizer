import React, { useState } from 'react';
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

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled(motion.button)`
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &.primary {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
    }
  }
  
  &.secondary {
    background: linear-gradient(135deg, #6b7280, #4b5563);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #4b5563, #374151);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(107, 114, 128, 0.3);
    }
  }
  
  &.success {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #059669, #047857);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    }
  }
  
  &.danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
    }
  }
  
  &.warning {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #d97706, #b45309);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
    }
  }
`;

const FullWidthButton = styled(Button)`
  grid-column: 1 / -1;
  margin-bottom: 15px;
`;

const Message = styled(motion.div)`
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  margin-top: 15px;
  
  &.success {
    background: #d1fae5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }
  
  &.error {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fca5a5;
  }
  
  &.info {
    background: #dbeafe;
    color: #1e40af;
    border: 1px solid #93c5fd;
  }
`;

const ControlPanel = ({ onOperation, isLoading, message }) => {
  const [insertValue, setInsertValue] = useState('');
  const [deleteValue, setDeleteValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleInsert = () => {
    const value = parseInt(insertValue);
    if (!isNaN(value)) {
      onOperation('insert', value);
      setInsertValue('');
    }
  };

  const handleDelete = () => {
    const value = parseInt(deleteValue);
    if (!isNaN(value)) {
      onOperation('delete', value);
      setDeleteValue('');
    }
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (!isNaN(value)) {
      onOperation('search', value);
      setSearchValue('');
    }
  };

  const handleKeyPress = (e, operation) => {
    if (e.key === 'Enter') {
      switch (operation) {
        case 'insert':
          handleInsert();
          break;
        case 'delete':
          handleDelete();
          break;
        case 'search':
          handleSearch();
          break;
        default:
          break;
      }
    }
  };

  const getMessageType = () => {
    if (!message) return '';
    if (message.includes('successfully') || message.includes('found')) return 'success';
    if (message.includes('Error') || message.includes('not found')) return 'error';
    return 'info';
  };

  return (
    <Panel
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Title>Tree Operations</Title>
      
      <InputGroup>
        <Label>Insert Value</Label>
        <Input
          type="number"
          placeholder="Enter value to insert"
          value={insertValue}
          onChange={(e) => setInsertValue(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, 'insert')}
          disabled={isLoading}
        />
      </InputGroup>
      
      <ButtonGroup>
        <Button
          className="primary"
          onClick={handleInsert}
          disabled={isLoading || !insertValue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Insert
        </Button>
        <Button
          className="secondary"
          onClick={() => onOperation('random')}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Random
        </Button>
      </ButtonGroup>
      
      <InputGroup>
        <Label>Delete Value</Label>
        <Input
          type="number"
          placeholder="Enter value to delete"
          value={deleteValue}
          onChange={(e) => setDeleteValue(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, 'delete')}
          disabled={isLoading}
        />
      </InputGroup>
      
      <Button
        className="danger"
        onClick={handleDelete}
        disabled={isLoading || !deleteValue}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ width: '100%', marginBottom: '20px' }}
      >
        Delete
      </Button>
      
      <InputGroup>
        <Label>Search Value</Label>
        <Input
          type="number"
          placeholder="Enter value to search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, 'search')}
          disabled={isLoading}
        />
      </InputGroup>
      
      <Button
        className="success"
        onClick={handleSearch}
        disabled={isLoading || !searchValue}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ width: '100%', marginBottom: '20px' }}
      >
        Search
      </Button>
      
      <FullWidthButton
        className="warning"
        onClick={() => onOperation('clear')}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Clear Tree
      </FullWidthButton>
      
      {message && (
        <Message
          className={getMessageType()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {message}
        </Message>
      )}
    </Panel>
  );
};

export default ControlPanel;
