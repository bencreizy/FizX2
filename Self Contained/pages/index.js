import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

// Import components from ../components
import ActionButton from '../components/ActionButton';
import ProfoundButton from '../components/ProfoundButton';
import ParanormalKnob from '../components/ParanormalKnob';
import SystemToggle from '../components/SystemToggle';

// Data Maps
const STIMULI_MAP = {
  Existential: { label: 'Existential Crisis' },
  Transcendental: { label: 'Transcendental Shift' },
  Whispering: { label: 'Whispering Shadows' }
};

const DISPLAY_TABS = [
  { id: 'report', label: 'Report' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'stacks', label: 'Stacks' }
];

// Styled wrapper for global layout
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0d1127;
  color: #00ffff;
  padding: 2rem;
  font-family: 'Courier New', monospace;
`;

const LucaTerminal = () => {
  // State Management
  const [inputPrompt, setInputPrompt] = useState('');
  const [lucaReport, setLucaReport] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [paranormalIntensity, setParanormalIntensity] = useState(0);
  const [activeTab, setActiveTab] = useState('report');
  const [isLoading, setIsLoading] = useState(false);
  const [liveData, setLiveData] = useState({
    z: 0.0,
    ep: 0.0,
    gen: 0,
    mem: 0
  });

  // Toggle System Handler
  const handleToggle = useCallback(() => {
    setIsRunning(prev => !prev);
    if (isRunning) {
      setParanormalIntensity(0);
    }
  }, [isRunning]);

  // Send to LUCA (Placeholder)
  const sendToLuca = useCallback(async (stimulus = null) => {
    setIsLoading(true);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock state updates
    setLiveData(prev => ({
      z: (Math.random() * 2).toFixed(2),
      ep: (Math.random() * 0.5).toFixed(3),
      gen: prev.gen + 1,
      mem: prev.mem + Math.floor(Math.random() * 5)
    }));
    
    setLucaReport({
      status: 'ok',
      message: `Processed ${stimulus || 'tick'} with intensity ${paranormalIntensity}`,
      timestamp: new Date().toISOString()
    });
    
    setIsLoading(false);
  }, [paranormalIntensity]);

  // Engage Paranormal
  const engageParanormal = useCallback(() => {
    if (paranormalIntensity > 0) {
      sendToLuca('paranormal');
    }
  }, [paranormalIntensity, sendToLuca]);

  // Tab Content Placeholder
  const TabContent = () => {
    if (!lucaReport) {
      return <p style={{ padding: '1rem', color: '#888' }}>No data available. Run a cycle to see results.</p>;
    }
    
    return (
      <div style={{ padding: '1rem' }}>
        <p><strong>Status:</strong> {lucaReport.status}</p>
        <p><strong>Message:</strong> {lucaReport.message}</p>
        <p><strong>Timestamp:</strong> {lucaReport.timestamp}</p>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>LUCA Terminal - Savior Engine</title>
        <meta name="description" content="Logical Universal Computational Architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <PageWrapper>
        {/* System Toggle Zone */}
        <div className="zone-system">
          <SystemToggle 
            isRunning={isRunning}
            onToggle={handleToggle}
          />
        </div>

        {/* Input Zone */}
        <div className="zone-input">
          <input
            className="luca-input-field"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Enter your existential prompt..."
            disabled={!isRunning}
          />
        </div>

        {/* Knob Zone */}
        <div className="zone-knob">
          <p className="scope-title">PARANORMAL INTENSITY MODULATION</p>
          <ParanormalKnob
            intensity={paranormalIntensity}
            onIntensityChange={setParanormalIntensity}
            disabled={!isRunning}
          />
          <ActionButton
            className="action"
            label="Engage Stimulus"
            onClick={engageParanormal}
            disabled={!isRunning || paranormalIntensity === 0}
          />
        </div>

        {/* Stimuli Zone */}
        <div className="zone-stimuli">
          <p className="scope-title">CATALYST TRIGGERS</p>
          <ProfoundButton
            label={STIMULI_MAP.Existential.label}
            onClick={() => sendToLuca('existential')}
            disabled={!isRunning}
          />
          <ProfoundButton
            label={STIMULI_MAP.Transcendental.label}
            onClick={() => sendToLuca('transcendental')}
            disabled={!isRunning}
          />
          <ActionButton
            className="tab"
            label={STIMULI_MAP.Whispering.label}
            onClick={() => sendToLuca('whispering')}
            disabled={!isRunning}
          />
        </div>

        {/* Action Zone */}
        <div className="zone-action">
          <ActionButton
            className="action"
            label="Send Tick"
            onClick={() => sendToLuca('tick')}
            disabled={!isRunning || isLoading}
          />
          <ActionButton
            className="action"
            label="Export Gift"
            onClick={() => console.log('Exporting gift...')}
            disabled={!isRunning}
          />
          <ActionButton
            className="action"
            label="Data Retrieval"
            onClick={() => console.log('Retrieving data...')}
            disabled={!isRunning}
          />
        </div>

        {/* Round Scope Zone */}
        <div className="zone-round-scope">
          <p className="scope-title">Emergence Scope @ 20 Hz</p>
          <div className="ui-round-scope">
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Z:</strong> {liveData.z}
            </div>
            <div>
              <strong>Ep:</strong> {liveData.ep}
            </div>
          </div>
        </div>

        {/* Display Zone */}
        <div className="zone-display">
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '1rem',
            borderBottom: '1px solid #00ffff',
            paddingBottom: '0.5rem'
          }}>
            {DISPLAY_TABS.map(tab => (
              <ActionButton
                key={tab.id}
                className={activeTab === tab.id ? 'tab active' : 'tab'}
                label={tab.label}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
          <TabContent />
        </div>
      </PageWrapper>
    </>
  );
};

export default LucaTerminal;
