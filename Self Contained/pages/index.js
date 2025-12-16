// pages/index.js - LUCA Terminal Interface (EXACT MATCH TO REFERENCE UI)
import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

// Import all components
import ActionButton from '../components/ActionButton'; 
import ProfoundButton from '../components/ProfoundButton'; 
import ParanormalKnob from '../components/ParanormalKnob'; 
import SystemToggle from '../components/SystemToggle';

// Container - Dark navy/black background exactly as in reference
const Container = styled.div`
  min-height: 100vh;
  background: #0a0f1e;
  color: #00ffff;
  padding: 2.5rem 3rem;
  font-family: 'Courier New', Courier, monospace;
`;

// Header with horizontal line underneath
const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #00ffff;
  
  h1 {
    font-size: 3.5rem;
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 1.5rem;
    color: #00ffff;
    text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
    font-weight: 700;
  }
  
  p {
    font-size: 0.9rem;
    color: #ff0066;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    font-weight: 400;
  }
`;

// Main grid layout - exactly 3 columns as in reference
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  gap: 2rem;
  max-width: 1800px;
  margin: 0 auto;
  
  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Base panel styling
const Panel = styled.div`
  background: rgba(10, 15, 30, 0.6);
  border: 2px solid ${props => props.$borderColor || '#00ffff'};
  border-radius: 15px;
  padding: 1.5rem;
  position: relative;
  
  h2 {
    font-size: 1.1rem;
    margin: 0 0 1.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
    color: ${props => props.$titleColor || '#00ffff'};
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${props => props.$borderColor || '#00ffff'};
    font-weight: 600;
  }
`;

// Left Panel - System Controls (Pink border)
const ControlsPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

// Center Panel - Terminal (Cyan border)
const TerminalPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  min-height: 550px;
`;

// Terminal output area
const Terminal = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-y: auto;
  min-height: 400px;
  font-size: 0.85rem;
  line-height: 1.6;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00ffff;
    border-radius: 3px;
  }
`;

// Terminal line
const TerminalLine = styled.div`
  margin-bottom: 0.4rem;
  color: ${props => {
    switch(props.$type) {
      case 'error': return '#ff0066';
      case 'success': return '#00ff88';
      case 'warning': return '#ffaa00';
      default: return '#00ffff';
    }
  }};
  white-space: pre-wrap;
  
  span.timestamp {
    color: #666;
    margin-right: 0.5rem;
  }
`;

// Input area with command input and button
const InputArea = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  
  input {
    flex: 1;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid #00ffff;
    border-radius: 8px;
    padding: 0.85rem 1rem;
    color: #00ffff;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: #00ffff;
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
    }
    
    &::placeholder {
      color: rgba(0, 255, 255, 0.4);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

// Execute button styling
const ExecuteButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #00ffff;
  border-radius: 8px;
  padding: 0.85rem 2rem;
  color: #00ffff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Right Panel - System Status (Green border)
const StatusPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Status item - two columns with label and value
const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1.2rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid ${props => props.$active ? '#00ff88' : '#00ffff'};
  border-radius: 8px;
  
  .label {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.1rem;
    color: #00ffff;
  }
  
  .value {
    color: ${props => props.$active ? '#00ff88' : '#ff0066'};
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.05rem;
  }
`;

// Button group for Analyze and Calibrate buttons
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

// Component
export default function LucaTerminal() {
  const [isRunning, setIsRunning] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [terminalOutput, setTerminalOutput] = useState([
    { id: 0, type: 'info', content: '[6:16:28 AM] === LUCA SYSTEM INITIALIZED ===', timestamp: new Date() },
    { id: 1, type: 'info', content: '[6:16:28 AM] Logical Universal Computational Architecture v2.0', timestamp: new Date() },
    { id: 2, type: 'info', content: '[6:16:28 AM] All systems nominal. Ready for commands.', timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [systemStats, setSystemStats] = useState({
    cycles: 0,
    integrity: 100.0,
    memoryNodes: 0,
    generation: 0,
  });

  const addTerminalLine = useCallback((content, type = 'info') => {
    setTerminalOutput(prev => [
      ...prev,
      { 
        id: prev.length, 
        type, 
        content, 
        timestamp: new Date() 
      }
    ]);
  }, []);

  const handleToggleSystem = useCallback(() => {
    setIsRunning(prev => !prev);
    if (!isRunning) {
      addTerminalLine('[' + new Date().toLocaleTimeString() + '] > SYSTEM ACTIVATED', 'success');
      addTerminalLine('[' + new Date().toLocaleTimeString() + '] > Initializing memory mesh...', 'info');
      addTerminalLine('[' + new Date().toLocaleTimeString() + '] > Starting genome evolution...', 'info');
    } else {
      addTerminalLine('[' + new Date().toLocaleTimeString() + '] > SYSTEM DEACTIVATED', 'warning');
    }
  }, [isRunning, addTerminalLine]);

  const handleIntensityChange = useCallback((value) => {
    setIntensity(value);
    if (isRunning) {
      addTerminalLine(`[${new Date().toLocaleTimeString()}] > Intensity adjusted to ${value}%`, 'info');
    }
  }, [isRunning, addTerminalLine]);

  const handleAnalyze = useCallback(() => {
    if (!isRunning) {
      addTerminalLine(`[${new Date().toLocaleTimeString()}] > ERROR: System must be active`, 'error');
      return;
    }
    addTerminalLine(`[${new Date().toLocaleTimeString()}] > Running analysis cycle...`, 'info');
    const timeoutId = setTimeout(() => {
      setSystemStats(prev => ({
        ...prev,
        cycles: prev.cycles + 1,
        integrity: Math.max(50, prev.integrity - Math.random() * 5),
        memoryNodes: prev.memoryNodes + Math.floor(Math.random() * 10),
      }));
      addTerminalLine(`[${new Date().toLocaleTimeString()}] > Analysis complete. Intensity factor: ${intensity}%`, 'success');
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [isRunning, intensity, addTerminalLine]);

  const handleCalibrate = useCallback(() => {
    if (!isRunning) {
      addTerminalLine(`[${new Date().toLocaleTimeString()}] > ERROR: System must be active`, 'error');
      return;
    }
    addTerminalLine(`[${new Date().toLocaleTimeString()}] > Calibrating genome parameters...`, 'info');
    const timeoutId = setTimeout(() => {
      setSystemStats(prev => ({
        ...prev,
        integrity: Math.min(100, prev.integrity + 20),
        generation: prev.generation + 1,
      }));
      addTerminalLine(`[${new Date().toLocaleTimeString()}] > Calibration successful. Integrity restored.`, 'success');
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [isRunning, addTerminalLine]);

  const handleExecute = useCallback(() => {
    if (!isRunning) {
      addTerminalLine(`[${new Date().toLocaleTimeString()}] > ERROR: System must be active`, 'error');
      return;
    }
    if (!inputValue.trim()) {
      addTerminalLine(`[${new Date().toLocaleTimeString()}] > ERROR: No command provided`, 'error');
      return;
    }
    addTerminalLine(`[${new Date().toLocaleTimeString()}] > EXEC: ${inputValue}`, 'info');
    const timeoutId = setTimeout(() => {
      addTerminalLine(`[${new Date().toLocaleTimeString()}] > Command executed: ${inputValue}`, 'success');
      setInputValue('');
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [isRunning, inputValue, addTerminalLine]);

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleExecute();
    }
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setSystemStats(prev => ({
          ...prev,
          integrity: Math.max(40, prev.integrity - 0.1),
        }));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <>
      <Head>
        <title>LUCA Terminal - Savior Engine</title>
        <meta name="description" content="Logical Universal Computational Architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Header>
          <h1>LUCA TERMINAL</h1>
          <p>SAVIOR ENGINE V2.0 - CYBERNETIC INTERFACE</p>
        </Header>

        <MainGrid>
          {/* Left Panel - System Controls (Pink/Magenta border) */}
          <ControlsPanel $borderColor="#ff0066" $titleColor="#ff0066">
            <h2>SYSTEM CONTROLS</h2>
            
            <SystemToggle 
              isRunning={isRunning} 
              onToggle={handleToggleSystem}
            />
            
            <ParanormalKnob 
              intensity={intensity}
              onIntensityChange={handleIntensityChange}
              disabled={!isRunning}
            />
            
            <ButtonGroup>
              <ActionButton 
                label="ANALYZE"
                onClick={handleAnalyze}
                disabled={!isRunning}
              />
              <ProfoundButton 
                label="Calibrate"
                onClick={handleCalibrate}
                disabled={!isRunning}
              />
            </ButtonGroup>
          </ControlsPanel>

          {/* Center Panel - System Terminal (Cyan border) */}
          <TerminalPanel $borderColor="#00ffff" $titleColor="#00ffff">
            <h2>SYSTEM TERMINAL</h2>
            <Terminal>
              {terminalOutput.map(line => (
                <TerminalLine key={line.id} $type={line.type}>
                  {line.content}
                </TerminalLine>
              ))}
            </Terminal>
            <InputArea>
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Enter command..."
                disabled={!isRunning}
              />
              <ExecuteButton 
                onClick={handleExecute}
                disabled={!isRunning}
              >
                EXECUTE
              </ExecuteButton>
            </InputArea>
          </TerminalPanel>

          {/* Right Panel - System Status (Green border) */}
          <StatusPanel $borderColor="#00ff88" $titleColor="#00ff88">
            <h2>SYSTEM STATUS</h2>
            
            <StatusItem $active={isRunning}>
              <span className="label">STATUS</span>
              <span className="value">{isRunning ? 'ONLINE' : 'OFFLINE'}</span>
            </StatusItem>
            
            <StatusItem $active={systemStats.integrity > 70}>
              <span className="label">INTEGRITY</span>
              <span className="value">{systemStats.integrity.toFixed(1)}%</span>
            </StatusItem>
            
            <StatusItem $active={isRunning}>
              <span className="label">CYCLES</span>
              <span className="value">{systemStats.cycles}</span>
            </StatusItem>
            
            <StatusItem $active={systemStats.memoryNodes > 0}>
              <span className="label">MEMORY NODES</span>
              <span className="value">{systemStats.memoryNodes}</span>
            </StatusItem>
            
            <StatusItem $active={isRunning}>
              <span className="label">GENERATION</span>
              <span className="value">{systemStats.generation}</span>
            </StatusItem>
            
            <StatusItem $active={isRunning}>
              <span className="label">INTENSITY</span>
              <span className="value">{intensity}%</span>
            </StatusItem>
          </StatusPanel>
        </MainGrid>
      </Container>
    </>
  );
}
