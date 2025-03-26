import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // ← แบบนี้ต้อง export default

const Dashbord = () => {
  return (
    <div className="flex h-screen">
      {/* ✅ Sidebar มีความกว้างที่แน่นอน และมี border ด้านขวา */}
      <div className="w-69 bg-white border-r">
        <Sidebar />
      </div>

      {/* ✅ MainContent ใช้ flex-1 เพื่อขยายเต็มพื้นที่ที่เหลือ */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashbord;
