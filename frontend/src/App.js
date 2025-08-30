import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import BSTVisualizer from './components/BSTVisualizer';
import ControlPanel from './components/ControlPanel';
import TraversalPanel from './components/TraversalPanel';
import { BSTService } from './services/bstService';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', sans-serif;
  padding: 20px;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 30px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin: 10px 0 0 0;
  opacity: 0.9;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

const VisualizationArea = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-height: 600px;
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StatusBar = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  color: white;
  text-align: center;
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusLabel = styled.span`
  font-weight: 500;
`;

const StatusValue = styled.span`
  font-weight: 600;
  color: #ffd700;
`;

function App() {
  const [treeState, setTreeState] = useState(null);
  const [operationSteps, setOperationSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [traversalResults, setTraversalResults] = useState({});

  useEffect(() => {
    fetchTreeState();
  }, []);

  const fetchTreeState = async () => {
    try {
      const response = await BSTService.getTreeState();
      setTreeState(response.tree_state);
      setOperationSteps(response.operation_steps);
    } catch (error) {
      console.error('Error fetching tree state:', error);
      setMessage('Error connecting to backend');
    }
  };

  const handleOperation = async (operation, value = null) => {
    setIsLoading(true);
    setMessage('');
    
    try {
      let response;
      switch (operation) {
        case 'insert':
          response = await BSTService.insert(value);
          break;
        case 'delete':
          response = await BSTService.delete(value);
          break;
        case 'search':
          response = await BSTService.search(value);
          break;
        case 'clear':
          response = await BSTService.clear();
          break;
        case 'random':
          response = await BSTService.generateRandom();
          break;
        default:
          throw new Error('Unknown operation');
      }
      
      setTreeState(response.tree_state);
      setOperationSteps(response.operation_steps);
      setMessage(response.message);
    } catch (error) {
      console.error('Error performing operation:', error);
      setMessage('Error performing operation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTraversal = async (type) => {
    try {
      const response = await BSTService.getTraversal(type);
      setTraversalResults(prev => ({
        ...prev,
        [type]: response.traversal
      }));
    } catch (error) {
      console.error('Error getting traversal:', error);
    }
  };

  return (
    <AppContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Binary Search Tree Visualizer</Title>
        <Subtitle>Interactive visualization of BST operations and algorithms</Subtitle>
      </Header>

      <MainContent>
        <VisualizationArea
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BSTVisualizer
            treeState={treeState}
            operationSteps={operationSteps}
            isLoading={isLoading}
          />
        </VisualizationArea>

        <SidePanel>
          <ControlPanel
            onOperation={handleOperation}
            isLoading={isLoading}
            message={message}
          />
          
          <TraversalPanel
            onTraversal={handleTraversal}
            results={traversalResults}
          />
          
          <StatusBar
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Tree Status</h3>
            {treeState && (
              <>
                <StatusItem>
                  <StatusLabel>Size:</StatusLabel>
                  <StatusValue>{treeState.size}</StatusValue>
                </StatusItem>
                <StatusItem>
                  <StatusLabel>Height:</StatusLabel>
                  <StatusValue>{treeState.height}</StatusValue>
                </StatusItem>
                <StatusItem>
                  <StatusLabel>Empty:</StatusLabel>
                  <StatusValue>{treeState.is_empty ? 'Yes' : 'No'}</StatusValue>
                </StatusItem>
              </>
            )}
          </StatusBar>
        </SidePanel>
      </MainContent>
    </AppContainer>
  );
}

export default App;
