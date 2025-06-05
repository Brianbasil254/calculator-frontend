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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Simple Calculator</h2>

        <form onSubmit={handleCalculate} className="space-y-4">
          <input
            type="number"
            placeholder="First number"
            value={operand1}
            onChange={(e) => setOperand1(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number"
            placeholder="Second number"
            value={operand2}
            onChange={(e) => setOperand2(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Calculate
          </button>
        </form>

        {result !== null && (
          <div className="mt-6 text-xl font-semibold text-center text-green-600">
            Result: {result}
          </div>
        )}

        {error && (
          <div className="mt-6 text-sm text-center text-red-500">
            {error}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="text-sm text-indigo-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
