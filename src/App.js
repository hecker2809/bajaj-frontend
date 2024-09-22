
import React, { useState } from 'react';
import ResponseSection from './ResponseSection';
function App() {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

const apiUrl = 'https://bfhl-backend-beta.vercel.app/bfhl';
  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(inputData);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });

      const data = await response.json();
      setResponseData(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilters(
      selectedFilters.includes(value)
        ? selectedFilters.filter((filter) => filter !== value)
        : [...selectedFilters, value]
    );
  };

  return (
    <div className="App">
      <h1>JSON Input</h1>
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter JSON here..."
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseData && (
        <>
          <h2>Select Data to Display</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleFilterChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleFilterChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest lowercase alphabet"
                onChange={handleFilterChange}
              />
              Highest lowercase alphabet
            </label>
          </div>
          <ResponseSection data={responseData} selectedFilters={selectedFilters} />
        </>
      )}
    </div>
  );
}

export default App;
