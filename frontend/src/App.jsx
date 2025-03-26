import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExchangeRates from './components/ExchangeRates';
import Dashboard from './components/Dashboard/Dashboard';
import AddRate from './components/Dashboard/AddRate';
import Allrate from './components/Dashboard/Allrate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExchangeRates />} />

        {/* Admin layout */}
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={
            <div className="p-6 text-xl text-gray-700 font-bold">
              👋 ยินดีต้อนรับเข้าสู่ระบบ Admin
            </div>
          } />
          <Route path="add-rate" element={<AddRate />} />
          <Route path="allrate" element={<Allrate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;