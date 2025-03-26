import { useState } from "react";

export default function AddRate() {
  const [formData, setFormData] = useState({
    currency: "",
    denom: "",
    buying: "",
    selling: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 ส่งข้อมูล:", formData);
    // TODO: ส่งข้อมูลไป API หรือเก็บ local
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