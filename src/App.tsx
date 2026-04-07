import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profiles from './pages/Profiles';
import Workflows from './pages/Workflows';
import Approvals from './pages/Approvals';
import Logs from './pages/Logs';
import Metrics from './pages/Metrics';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="logs" element={<Logs />} />
          <Route path="metrics" element={<Metrics />} />
        </Route>
      </Routes>
    </Router>
  );
}
