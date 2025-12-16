import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
.switch { width: 80px; height: 120px; }
`;

export default function SystemToggle({ isRunning, onToggle }) {
  return (
    <Wrapper>
      <label className="switch">
        <input type="checkbox" checked={isRunning} onChange={onToggle} />
        <div className="button" />
      </label>
    </Wrapper>
  );
}
