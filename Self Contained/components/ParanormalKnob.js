import React from 'react';

export default function ParanormalKnob({ intensity, onIntensityChange, disabled }) {
  return (
    <div>
      <p>Intensity: {intensity}</p>
      <input type="range" min="0" max="5" value={intensity}
        disabled={disabled}
        onChange={e => onIntensityChange(Number(e.target.value))} />
    </div>
  );
}
