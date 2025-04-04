import React, { useState } from 'react';
import GraphComponent from './GraphComponent';
import SliderControl from './SliderControl';
import cos from '@stdlib/math/base/special/cos';
import tan from '@stdlib/math/base/special/tan';
import abs from '@stdlib/math/base/special/abs';

const TanGraph = () => {
  const [scale, setScale] = useState(1);
  const [range, setRange] = useState(5);

  const generateData = () => {
    let results = [];
    
    for (let x = -10; x <= 10; x += 0.05) {
      if (abs(cos(x)) > 0.1) {
        results.push({ 
          x, 
          y: scale * tan(x) 
        });
      }
    }
    
    return results;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-600 mb-4">Tangent Function</h2>
      <div className="mb-6 text-gray-700">
        <p>The tangent function has a period of π and has vertical asymptotes at x = π/2 + nπ.</p>
        <p className="mt-2 font-mono bg-gray-100 p-2 rounded">y = {scale} × tan(x)</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SliderControl 
          label="Scale Factor" 
          value={scale} 
          onChange={setScale} 
          min={0.1} 
          max={3} 
          step={0.1}
          color="green" 
        />
        <SliderControl 
          label="Y-Axis Range" 
          value={range} 
          onChange={setRange} 
          min={2} 
          max={20} 
          step={1}
          color="green" 
        />
      </div>
      
      <GraphComponent 
        data={generateData()} 
        xAxisLabel="x" 
        yAxisLabel="tan(x)" 
        color="rgb(34, 197, 94)" 
        yDomain={[-range, range]} 
      />
    </div>
  );
};

export default TanGraph;
