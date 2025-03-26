import { NavLink } from "react-router-dom";
import { FaChartLine, FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-black text-white p-6 flex flex-col shadow-lg font-[Prompt]">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      {/* Menu */}
      <nav className="flex-1 space-y-4">
        <NavLink
          to="/admin/allrate"
          className="flex items-center gap-3 text-white hover:bg-yellow-600 px-3 py-2 rounded transition"
        >
          <FaChartLine />
          <span>รายการอัตราแลกเปลี่ยน</span>
        </NavLink>
      </nav>

      {/* Fake Admin Info */}
      <div className="mt-auto pt-6 border-t border-yellow-400">
        <div className="flex items-center gap-3 px-3 py-2">
          <FaUser />
          <div>
            <p className="font-semibold">Admin Tester</p>
            <p className="text-sm">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;