import { useState } from 'react';
import Header from './components/Header';
import SinGraph from './components/SinGraph';
import CosGraph from './components/CosGraph';
import TanGraph from './components/TanGraph';

function App() {
  const [activeGraph, setActiveGraph] = useState('sin');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeGraph={activeGraph} setActiveGraph={setActiveGraph} />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Interactive Math Graphs
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeGraph === 'sin' && <SinGraph />}
          {activeGraph === 'cos' && <CosGraph />}
          {activeGraph === 'tan' && <TanGraph />}
        </div>
      </main>
      <footer className="bg-indigo-600 text-white text-center py-4 mt-8">
        <p>Graphs - Visualize Mathematical Functions</p>
      </footer>
    </div>
  )
}

export default App
