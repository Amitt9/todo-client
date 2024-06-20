import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  const handleClear = () => {
    setTerm('');
    onSearch('');
};

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex items-center">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          placeholder="Search..."
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Search</button>
        {term && (
                <button onClick={handleClear} className="ml-2 p-2 bg-red-500 text-white rounded">
                    Clear
                </button>
            )}
      </div>
    </form>
  );
};

export default Search;
