import { useState, useEffect } from 'react';
import API from '../api';

export default function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculate = async () => {
    setError('');
    if (a === '' || b === '') {
      return setError('Please enter both numbers.');
    }
    setLoading(true);
    try {
      const res = await API.post('/calculator', { a: Number(a), b: Number(b), operation });
      setResult(res.data.result);
      fetchHistory();
    } catch (err) {
      alert('Calculation error.');
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await API.get('/calculations?limit=5');
      setHistory(res.data);
    } catch (err) {
      console.error('History fetch error.');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Calculator</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-3">
        <input
          type="number"
          placeholder="a"
          className="mr-2 p-2 border"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <input
          type="number"
          placeholder="b"
          className="mr-2 p-2 border"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
        <select
          className="p-2 border"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">+</option>
          <option value="subtract">−</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
      </div>
      <button
        onClick={calculate}
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Calculating...' : 'Calculate'}
      </button>

      {result !== null && (
        <div className="mt-4 text-xl font-semibold">Result: {result}</div>
      )}

      <div className="mt-6">
        <h3 className="font-bold mb-2">Recent History</h3>
        <ul className="list-disc pl-5">
          {history.map((item, index) => (
            <li key={index}>
              {item.a} {item.operation} {item.b} = {item.result} ({item.created_at})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
