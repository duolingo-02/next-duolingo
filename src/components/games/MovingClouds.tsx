import React from 'react';

const MovingClouds: React.FC= () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
    </div>
  );
};

export default MovingClouds;