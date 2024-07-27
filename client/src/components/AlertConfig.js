import React from 'react';

const AlertConfig = ({ threshold, onThresholdChange }) => {
  const handleThresholdChange = (e) => {
    const newThreshold = Number(e.target.value);
    onThresholdChange(newThreshold);
  };

  return (
    <div className="alert-config">
      <h3>Alert Configuration</h3>
      <label htmlFor="temp-threshold">Temperature Threshold (°C):</label>
      <input
        type="number"
        id="temp-threshold"
        value={threshold}
        onChange={handleThresholdChange}
        min="0"
        max="50"
        step="0.1"
      />
      <p>Alert will be triggered if temperature exceeds {threshold}°C.</p>
    </div>
  );
};

export default AlertConfig;