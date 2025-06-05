import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Calculator from './components/calculator';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/calculator" element={isLoggedIn ? <Calculator /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
