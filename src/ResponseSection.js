import React from 'react';

function ResponseSection({ data, selectedFilters }) {
  const { numbers, alphabets, highest_lowercase_alphabet } = data;

  const filteredData = {};

  if (selectedFilters.includes('Numbers')) {
    filteredData.numbers = numbers;
  }

  if (selectedFilters.includes('Alphabets')) {
    filteredData.alphabets = alphabets;
  }

  if (selectedFilters.includes('Highest lowercase alphabet')) {
    filteredData.highest_lowercase_alphabet = highest_lowercase_alphabet;
  }

  return (
    <div className="mt-4">
      <h2>Response Data</h2>
      <pre>{JSON.stringify(filteredData, null, 2)}</pre>
    </div>
  );
}

export default ResponseSection;
