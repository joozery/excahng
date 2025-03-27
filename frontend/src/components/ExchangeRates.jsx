import { useEffect, useState } from "react";
import axios from "axios";

export default function ExchangeRates() {
  const [rates, setRates] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const itemsPerPage = 18;
  const totalPages = Math.ceil(rates.length / itemsPerPage);

  useEffect(() => {
    axios
      .get("https://exchangerate-server-p-907301d4b083.herokuapp.com/api/rates")
      .then((res) => setRates(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % totalPages);
    }, 10000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const currentRates = rates.slice(
    pageIndex * itemsPerPage,
    pageIndex * itemsPerPage + itemsPerPage
  );

  const formatRateDisplay = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num < 1 ? num.toFixed(4) : num.toFixed(2);
  };

  const formatDateThai = (date) => {
    const months = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543;
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `Date: ${day} ${month} ${year} | Time: ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center p-6">
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold text-yellow-500">TX Exchange co,.Ltd</h1>
        <h2 className="text-xl font-semibold text-yellow-500">MC125660031</h2>
        <p className="text-sm text-gray-600 mt-1">{formatDateThai(currentTime)}</p>
      </div>

      <h2 className="text-xl font-bold text-yellow-500 mb-4 text-center bg-yellow-100 px-6 py-1 rounded-full">
        RATE
      </h2>

      <div className="w-full max-w-4xl shadow-md rounded-xl overflow-hidden">
        <div className="grid grid-cols-4 bg-yellow-400 text-black font-semibold py-2 px-4">
          <div>Currency</div>
          <div>Denom</div>
          <div>Buy</div>
          <div>Sell</div>
        </div>

        {currentRates.map((rate, index) => (
          <div
            key={rate.id || index}
            className={`grid grid-cols-4 px-4 py-2 border-b border-yellow-300 ${
              index % 2 === 0 ? "bg-white" : "bg-yellow-50"
            }`}
          >
            <div className="flex items-center gap-2">
              {rate.flag_url && (
                <img src={rate.flag_url} alt="flag" className="w-6 h-4 border rounded" />
              )}
              {rate.currency}
            </div>
            <div>{rate.denom}</div>
            <div className="text-green-600 font-semibold">
              {formatRateDisplay(rate.buying)}
            </div>
            <div className="text-red-500 font-semibold">
              {formatRateDisplay(rate.selling)}
            </div>
          </div>
        ))}

        <div className="text-xs text-center text-gray-500 py-3">
          *Rates are subject to change without notice
        </div>
      </div>
    </div>
  );
}