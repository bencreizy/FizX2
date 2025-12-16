import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
button {
  color: white;
  background: #990033;
  padding: 1rem 1.5rem;
  border-radius: 5rem;
  border: 5px solid #ff0066;
  font-size: 1.2rem;
}
`;

export default function ProfoundButton({ label, onClick, disabled }) {
  return (
    <Wrapper>
      <button onClick={onClick} disabled={disabled}>{label}</button>
    </Wrapper>
  );
}
