// src/components/Calculator.js
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Calculator = () => {
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await API.post('/calculator', {
        a: Number(operand1),
        b: Number(operand2),
        operation,
      });

      setResult(response.data.result);
    } catch (err) {
      setError('Calculation failed: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Calculator</h2>
        <form onSubmit={handleCalculate}>
          <input
            type="number"
            placeholder="First number"
            value={operand1}
            onChange={(e) => setOperand1(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Second number"
            value={operand2}
            onChange={(e) => setOperand2(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Calculate
          </button>
        </form>
        {result !== null && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            Result: {result}
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-600 font-semibold">{error}</div>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 text-sm text-gray-600 underline"
      >
        Logout
      </button>
    </div>
  );
};

export default Calculator;
