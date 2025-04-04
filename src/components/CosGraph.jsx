import React, { useState } from 'react';
import GraphComponent from './GraphComponent';
import SliderControl from './SliderControl';
import cos from '@stdlib/math/base/special/cos';
import max from '@stdlib/math/base/special/fast/max';

const CosGraph = () => {
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1);

  function generateData() {
    const data = [];
    let x = -10;
    while (x <= 10) {
      data.push({ x, y: amplitude * cos(frequency * x) });
      x += 0.1;
    }
    return data;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Cosine Function</h2>
      <div className="mb-6 text-gray-700">
        <p>The cosine function has a period of 2π and oscillates between -{amplitude} and {amplitude}.</p>
        <p className="mt-2 font-mono bg-gray-100 p-2 rounded">y = {amplitude} × cos({frequency}x)</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SliderControl 
          label="Amplitude" 
          value={amplitude} 
          onChange={setAmplitude} 
          min={0.1} 
          max={5} 
          step={0.1}
          color="blue" 
        />
        <SliderControl 
          label="Frequency" 
          value={frequency} 
          onChange={val => setFrequency(val)} 
          min={0.1} 
          max={5} 
          step={0.1}
          color="blue" 
        />
      </div>
      
      <GraphComponent 
        data={generateData()} 
        xAxisLabel="x" 
        yAxisLabel="cos(x)" 
        color="rgb(59, 130, 246)" 
        yDomain={[-max(5, amplitude * 1.2), max(5, amplitude * 1.2)]}
      />
    </div>
  );
};

export default CosGraph;
