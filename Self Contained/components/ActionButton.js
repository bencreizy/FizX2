import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  
  button {
    width: 100%;
    padding: 0.75rem 1.5rem;
    text-transform: uppercase;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    color: rgba(255, 255, 255, 0.7);
    background: transparent;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    font-family: 'Courier New', Courier, monospace;
  }
  
  button:hover:not(:disabled) {
    color: #ffffff;
    background: rgba(0, 140, 255, 0.2);
    border-color: #008cff;
    box-shadow: 0 0 15px rgba(0, 140, 255, 0.4);
  }
  
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default function ActionButton({ label, onClick, disabled, className }) {
  return (
    <StyledWrapper className={className}>
      <button onClick={onClick} disabled={disabled}>{label}</button>
    </StyledWrapper>
  );
}
