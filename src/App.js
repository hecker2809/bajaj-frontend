import React, { useState } from 'react';
import axios from 'axios';
import jsonlint from 'jsonlint-mod';
import { Form, Button } from 'react-bootstrap';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = jsonlint.parse(jsonInput);
      setErrorMessage('');

      // Call the API with parsed JSON input
      const result = await axios.post('https://bajaj-backend-alpha-eight.vercel.app/bfhl', { data: parsedInput.data });
      if (result.data.is_success) {
        setResponse(result.data);
        setFilteredResponse([]);  // Reset filtered response on new submit
      } else {
        setErrorMessage('Error: Invalid data input or API failure');
      }
    } catch (error) {
      setErrorMessage('Invalid JSON format');
    }
  };

  const handleDropdownChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(selected);
    filterResponse(response, selected);
  };

  const filterResponse = (responseData, options) => {
    let filteredData = [];

    // Filter based on selected options
    if (options.includes('Alphabets')) {
      filteredData = [...filteredData, ...responseData.alphabets];
    }
    if (options.includes('Numbers')) {
      filteredData = [...filteredData, ...responseData.numbers];
    }
    if (options.includes('Highest lowercase alphabet')) {
      filteredData = [...filteredData, ...responseData.highest_lowercase_alphabet];
    }

    // Set filtered response; ensure it's always an array
    setFilteredResponse(filteredData.length > 0 ? filteredData : ['No valid data']);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">RA2111026030157</h1>

      {/* JSON Input Form */}
      <Form>
        <Form.Group>
          <Form.Label>API Input</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder='{"data": ["M","1","334","4","B"]}'
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit} className="mt-3">Submit</Button>
      </Form>

      {/* Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Multi-select Dropdown (only shows after successful response) */}
      {response && (
        <>
          <div className="mt-4">
            <Form.Group>
              <Form.Label>Multi Filter</Form.Label>
              <Form.Control as="select" multiple={true} onChange={handleDropdownChange}>
                <option value="Alphabets">Alphabets</option>
                <option value="Numbers">Numbers</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
              </Form.Control>
            </Form.Group>
          </div>

          {/* Filtered Response */}
          <div className="mt-4">
            <h4>Filtered Response</h4>
            <p>{selectedOptions.join(", ")}: {filteredResponse.join(", ")}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
