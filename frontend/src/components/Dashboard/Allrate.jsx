import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaSearch, FaTimes } from "react-icons/fa";
import Decimal from "decimal.js";

// ✅ ฟังก์ชันจัด format ทศนิยม
function formatNumber(value) {
  const num = new Decimal(value || "0");
  if (num.greaterThanOrEqualTo(1)) {
    return num.toFixed(2).toString(); // ถ้า >=1 เอา 2 ทศนิยม
  } else {
    return num.toFixed(6).toString(); // ถ้า <1 เอา 6 ทศนิยม
  }
}

export default function Allrate() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rates, setRates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRateId, setEditingRateId] = useState(null);
  const [newRate, setNewRate] = useState({
    currency: "",
    denom: "",
    buying: "",
    selling: "",
    flagFile: null,
  });

  const API_URL = "https://apiexchang.devwooyou.space/api/rates";

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = () => {
    axios
      .get(API_URL)
      .then((res) => setRates(res.data))
      .catch((err) => {
        console.error("Fetch error:", err);
        if (err.response) {
          console.error("Response error:", err.response.status, err.response.data);
        }
        if (err.code === 'ERR_CERT_COMMON_NAME_INVALID' || err.code === 'ERR_NETWORK') {
          alert("ไม่สามารถเชื่อมต่อกับ API ได้ กรุณาตรวจสอบการเชื่อมต่อหรือ SSL certificate");
        }
      });
  };

  const handleAddOrEditRate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("currency", newRate.currency);
    formData.append("denom", newRate.denom);
    formData.append("buying", formatNumber(newRate.buying));  // ✅ ฟอร์แมตตอนส่ง
    formData.append("selling", formatNumber(newRate.selling)); // ✅ ฟอร์แมตตอนส่ง
    if (newRate.flagFile) {
      formData.append("flag", newRate.flagFile);
    }

    try {
      if (editingRateId !== null) {
        await axios.put(`${API_URL}/${editingRateId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchRates();
      setIsModalOpen(false);
      setEditingRateId(null);
      setNewRate({ currency: "", denom: "", buying: "", selling: "", flagFile: null });
      alert(editingRateId !== null ? "แก้ไขข้อมูลเรียบร้อยแล้ว" : "เพิ่มข้อมูลเรียบร้อยแล้ว");
    } catch (err) {
      console.error("Save error:", err);
      alert(`เกิดข้อผิดพลาด: ${err.response?.data?.message || err.message || "ไม่สามารถบันทึกข้อมูลได้"}`);
    }
  };

  const openEditModal = (rate) => {
    setNewRate({
      currency: rate.currency,
      denom: rate.denom,
      buying: formatNumber(rate.buying),   // ✅ ฟอร์แมตตอนเปิดแก้ไข
      selling: formatNumber(rate.selling), // ✅ ฟอร์แมตตอนเปิดแก้ไข
      flagFile: null,
    });
    setEditingRateId(rate.id);
    setIsModalOpen(true);
  };

  const filteredRates = rates.filter((rate) =>
    rate.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-6xl font-[Prompt] relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">รายการอัตราแลกเปลี่ยน</h2>
        <button
          onClick={() => {
            setNewRate({ currency: "", denom: "", buying: "", selling: "", flagFile: null });
            setEditingRateId(null);
            setIsModalOpen(true);
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
        >
          ➕ เพิ่มอัตราแลกเปลี่ยน
        </button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="ค้นหาสกุลเงิน เช่น USD, EUR"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredRates.length === 0 ? (
        <p className="text-gray-500">ไม่พบข้อมูลที่ค้นหา</p>
      ) : (
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-yellow-400 text-black font-semibold">
            <tr>
              <th className="px-4 py-2 border text-left">Currency</th>
              <th className="px-4 py-2 border text-left">Denom</th>
              <th className="px-4 py-2 border text-left">Buy</th>
              <th className="px-4 py-2 border text-left">Sell</th>
              <th className="px-4 py-2 border text-center">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
  {filteredRates.map((rate, index) => (
    <tr key={rate.id} className={index % 2 === 0 ? "bg-white" : "bg-yellow-50"}>
      <td className="px-4 py-2 border flex items-center gap-2">
        {rate.flag_url && (
          <img src={rate.flag_url} alt="flag" className="w-6 h-4 border rounded" />
        )}
        {rate.currency}
      </td>
      <td className="px-4 py-2 border">{rate.denom}</td>
      <td className="px-4 py-2 border text-green-600 font-semibold">{formatNumber(rate.buying)}</td> {/* ✅ */}
      <td className="px-4 py-2 border text-red-500 font-semibold">{formatNumber(rate.selling)}</td> {/* ✅ */}
      <td className="px-4 py-2 border text-center">
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => openEditModal(rate)}
        >
          <FaEdit />
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-md font-[Prompt]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              {editingRateId !== null ? "แก้ไขอัตราแลกเปลี่ยน" : "เพิ่มอัตราแลกเปลี่ยนใหม่"}
            </h3>
            <form onSubmit={handleAddOrEditRate} className="space-y-3">
              <input
                type="text"
                placeholder="Currency เช่น USD 🇺🇸"
                value={newRate.currency}
                onChange={(e) => setNewRate({ ...newRate, currency: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Denomination เช่น 100"
                value={newRate.denom}
                onChange={(e) => setNewRate({ ...newRate, denom: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Buy Rate"
                value={newRate.buying}
                onChange={(e) => setNewRate({ ...newRate, buying: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Sell Rate"
                value={newRate.selling}
                onChange={(e) => setNewRate({ ...newRate, selling: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <div>
                <label className="block text-gray-700 mb-1">อัปโหลดธง</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewRate({ ...newRate, flagFile: e.target.files[0] })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded w-full"
              >
                {editingRateId !== null ? "📀 บันทึกการแก้ไข" : "➕ บันทึกเรท"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
