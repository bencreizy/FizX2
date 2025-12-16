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
  background: transparent;
  cursor: pointer;
  border: 1px solid #ffffff80;
  transition: 0.5s ease;
}
button:hover {
  color: #ffffff;
  background: var(--hover-color, #008cff);
  border-color: var(--hover-color, #008cff);
  box-shadow: 0 0 20px var(--hover-color, #008cff);
}
`;

export default function ActionButton({ label, onClick, disabled, className }) {
  return (
    <StyledWrapper className={className}>
      <button onClick={onClick} disabled={disabled}>{label}</button>
    </StyledWrapper>
  );
}
