import React from 'react';

const Header = ({ activeGraph, setActiveGraph }) => {
  const navItems = [
    { id: 'sin', label: 'Sine' },
    { id: 'cos', label: 'Cosine' },
    { id: 'tan', label: 'Tangent' }
  ];

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <nav className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Graphs</h1>
          <ul className="flex space-x-2 md:space-x-4">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveGraph(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeGraph === item.id
                      ? 'bg-indigo-800 text-white'
                      : 'hover:bg-indigo-700'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
