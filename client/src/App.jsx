import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import KPGenerator from './pages/KPGenerator';
import Transactions from './pages/Transactions';
import EmployeePerformance from './pages/EmployeePerformance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="performance" element={<EmployeePerformance />} />
          <Route path="kp-generator" element={<KPGenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
