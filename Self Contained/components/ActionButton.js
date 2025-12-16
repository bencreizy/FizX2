import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  button {
    padding: 10px 20px;
    text-transform: uppercase;
    border-radius: 8px;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff80;
    text-shadow: none;
    background: transparent;
    cursor: pointer;
    box-shadow: transparent;
    border: 1px solid #ffffff80;
    transition: 0.5s ease;
    user-select: none;
  }
  
  button:hover:not(:disabled),
  button:focus {
    color: #ffffff;
    background: #008cff;
    border: 1px solid #008cff;
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
    box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff, 0 0 100px #008cff;
  }
  
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default function ActionButton({ label, onClick, disabled, className }) {
  return (
    <StyledWrapper className={className}>
      <button onClick={onClick} disabled={disabled}>{label || 'Button'}</button>
    </StyledWrapper>
  );
}
