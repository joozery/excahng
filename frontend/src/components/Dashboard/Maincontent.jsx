import { useLocation } from "react-router-dom";
import AddRate from "./AddRate";
import Allrate from "./Allrate";

const MainContent = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-auto">
      {/* หน้าสำหรับเพิ่มเรท */}
      {currentPath === "/admin/add-rate" && <AddRate />}

      {/* หน้าแสดงรายการเรท */}
      {currentPath === "/admin/allrate" && <Allrate />}

      {/* หน้า default welcome */}
      {currentPath === "/admin" && (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">ยินดีต้อนรับสู่ Admin Dashboard</h1>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-6 rounded shadow-md">📊 ข้อมูลการใช้งานระบบ</div>
            <div className="bg-white p-6 rounded shadow-md">💡 คำแนะนำ หรือข่าวสาร</div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainContent;