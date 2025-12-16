/* components/ProfoundButton.js: Calibrate Button matching reference UI */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 15px rgba(255, 0, 102, 0.5); 
  }
  50% { 
    box-shadow: 0 0 25px rgba(255, 0, 102, 0.8), 0 0 35px rgba(255, 0, 102, 0.4); 
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
  
  .voltage-button { 
    position: relative;
    width: 100%;
  }
  
  .voltage-button button {
    width: 100%;
    color: white; 
    background: #c70058;
    padding: 0.75rem 1.5rem; 
    border-radius: 30px;
    border: none;
    font-size: 0.9rem; 
    font-weight: 600;
    letter-spacing: 0.05rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: capitalize;
    font-family: 'Courier New', Courier, monospace;
    box-shadow: 0 0 15px rgba(255, 0, 102, 0.4);
  }
  
  .voltage-button button:hover:not(:disabled) {
    background: #e6006f;
    animation: ${pulse} 1.5s infinite;
    transform: scale(1.02);
  }
  
  .voltage-button button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const ProfoundButton = ({ label, onClick, disabled }) => (
  <StyledWrapper>
    <div className="voltage-button">
      <button onClick={onClick} disabled={disabled}>{label}</button>
    </div>
  </StyledWrapper>
);

export default ProfoundButton;
