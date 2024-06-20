import React from 'react';
import List from './components/List.jsx';

const App = () => {
  
  return (
    <div className="App">
      <header className="bg-gray-800 flex justify-center text-white p-4">
        <h1 className="text-3xl  ">ToDo App</h1>
      </header>
      <main className="p-4">
        <List />
      </main>
    </div>
  );
};

export default App;
