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
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    setIsCalculating(true);
    setShowResult(false);

    try {
      const response = await API.post('/calculator', {
        a: Number(operand1),
        b: Number(operand2),
        operation,
      });
      setResult(response.data.result);
      setTimeout(() => setShowResult(true), 300);
    } catch (err) {
      setError('Calculation failed: ' + (err.response?.data?.error || err.message));
      setOperand1('');
      setOperand2('');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleClear = () => {
    setOperand1('');
    setOperand2('');
    setOperation('add');
    setResult(null);
    setError('');
    setShowResult(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getOperationSymbol = (op) => {
    const symbols = {
      add: '+',
      subtract: '−',
      multiply: '×',
      divide: '÷',
    };
    return symbols[op] || '+';
  };

  const getOperationColor = (op) => {
    const colors = {
      add: 'from-emerald-400 to-teal-500',
      subtract: 'from-red-400 to-pink-500',
      multiply: 'from-purple-400 to-indigo-500',
      divide: 'from-orange-400 to-red-500',
    };
    return colors[op] || 'from-emerald-400 to-teal-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8 relative">
      {/* Background visual effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Calculator card */}
      <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              {/* Replaced SVG with emoji */}
              <span className="text-white text-xl select-none">🧮</span>
            </div>
            <h2 className="text-xl text-white font-semibold">Smart Calculator</h2>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-white/70 hover:text-red-400 transition duration-200"
            title="Logout"
          >
            Logout
          </button>
        </div>

        <p className="text-white/70 text-sm mb-4 text-center">Perform stylish calculations</p>

        <form onSubmit={handleCalculate} className="space-y-5">
          <input
            type="number"
            value={operand1}
            onChange={(e) => setOperand1(e.target.value)}
            placeholder="Enter first number"
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
            required
          />

          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white appearance-none focus:ring-2 focus:ring-purple-400 outline-none transition-all"
          >
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (−)</option>
            <option value="multiply">Multiplication (×)</option>
            <option value="divide">Division (÷)</option>
          </select>

          <input
            type="number"
            value={operand2}
            onChange={(e) => setOperand2(e.target.value)}
            placeholder="Enter second number"
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isCalculating}
              className={`flex-1 bg-gradient-to-r ${getOperationColor(operation)} text-white p-4 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isCalculating ? (
                <span>Calculating...</span>
              ) : (
                <span>Calculate</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="bg-white/10 border border-white/20 text-white p-4 rounded-xl hover:bg-white/20 transition transform hover:scale-105 relative group"
            >
              Clear
              <span className="absolute bottom-full mb-1 text-xs text-white bg-black/60 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Clear inputs
              </span>
            </button>
          </div>
        </form>

        {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}

        {result !== null && (
          <div className={`mt-8 transform transition-all duration-500 ${showResult ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className={`bg-gradient-to-r ${getOperationColor(operation)}/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center`}>
              <div className="text-sm text-white/70 mb-1">Result</div>
              <div className="text-3xl font-bold text-white mb-2">{result}</div>
              <div className="text-sm text-white/60">
                {operand1} {getOperationSymbol(operation)} {operand2} = {result}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
