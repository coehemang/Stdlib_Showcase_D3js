import React, { useState } from 'react';
import GraphComponent from './GraphComponent';
import SliderControl from './SliderControl';
import sin from '@stdlib/math/base/special/sin';
import max from '@stdlib/math/base/special/fast/max';

const SinGraph = () => {
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1);

  const generateData = () => {
    let data = [];
    for (let x = -10.2; x <= 10.2; x += 0.1) {
      data.push({ x, y: amplitude * sin(frequency * x) });
    }
    return data;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Sine Function</h2>
      <div className="mb-6 text-gray-700">
        <p>The sine function has a period of 2π and oscillates between -{amplitude} and {amplitude}.</p>
        <p className="mt-2 font-mono bg-gray-100 p-2 rounded">y = {amplitude} × sin({frequency}x)</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SliderControl 
          label="Amplitude" 
          value={amplitude} 
          onChange={setAmplitude} 
          min={0.1} 
          max={5} 
          step={0.1}
          color="pink" 
        />
        <SliderControl 
          label="Frequency" 
          value={frequency} 
          onChange={setFrequency} 
          min={0.1} 
          max={5} 
          step={0.1}
          color="pink" 
        />
      </div>
      
      <GraphComponent 
        data={generateData()} 
        xAxisLabel="x" 
        yAxisLabel="sin(x)" 
        color="rgb(244, 114, 182)" 
        yDomain={[-1*max(5, amplitude * 1.2), max(5, amplitude * 1.2)]}
      />
    </div>
  );
};

export default SinGraph;
