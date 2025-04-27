import { useState } from "react";
import Decimal from "decimal.js";

function formatNumber(value) {
  const num = new Decimal(value || "0");

  if (num.greaterThanOrEqualTo(1)) {
    return num.toFixed(2).toString(); // >= 1 ตัดเหลือ 2 ทศนิยม
  } else {
    return num.toFixed(6).toString(); // < 1 ตัดเหลือ 6 ทศนิยม
  }
}

export default function AddRate() {
  const [formData, setFormData] = useState({
    currency: "",
    denom: "",
    buying: "",
    selling: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "buying" || name === "selling") {
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      currency: formData.currency,
      denom: formData.denom,
      buying: formatNumber(formData.buying),
      selling: formatNumber(formData.selling),
    };

    console.log("🚀 ส่งข้อมูล:", submitData);
    alert("เพิ่มเรทเรียบร้อยแล้ว!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">➕ เพิ่มอัตราแลกเปลี่ยน</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-xl space-y-4"
      >
        <div>
          <label className="block mb-1 text-gray-700">Currency</label>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            placeholder="เช่น USD 🇺🇸"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Denomination</label>
          <input
            type="text"
            name="denom"
            value={formData.denom}
            onChange={handleChange}
            placeholder="เช่น 100"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Buy Rate</label>
          <input
            type="text"
            name="buying"
            value={formData.buying}
            onChange={handleChange}
            placeholder="เช่น 33.62"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Sell Rate</label>
          <input
            type="text"
            name="selling"
            value={formData.selling}
            onChange={handleChange}
            placeholder="เช่น 33.73"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
        >
          ✅ บันทึกข้อมูล
        </button>
      </form>
    </div>
  );
}
