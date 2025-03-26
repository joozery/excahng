import { useEffect, useState } from "react";

export default function ExchangeRates() {
  const rates = [
    { currency: "USD 🇺🇸", denom: "100", buying: "33.62", selling: "33.73" },
    { currency: "EUR 🇪🇺", denom: "500-100", buying: "36.25", selling: "36.50" },
    { currency: "GBP 🇬🇧", denom: "50", buying: "43.35", selling: "43.60" },
    { currency: "CHF 🇨🇭", denom: "-", buying: "37.95", selling: "38.20" },
    { currency: "AUD 🇦🇺", denom: "100", buying: "20.95", selling: "21.15" },
    { currency: "JPY 🇯🇵", denom: "10000-5000", buying: "0.2260", selling: "0.2280" },
    { currency: "MYR 🇲🇾", denom: "100", buying: "7.56", selling: "7.64" },
    { currency: "SGD 🇸🇬", denom: "1000-100", buying: "25.95", selling: "26.25" },
    { currency: "KRW 🇰🇷", denom: "1000", buying: "0.0255", selling: "0.0271" },
    { currency: "CNY 🇨🇳", denom: "100", buying: "4.82", selling: "4.90" },
    { currency: "INR 🇮🇳", denom: "100", buying: "0.41", selling: "0.43" },
    { currency: "CAD 🇨🇦", denom: "100", buying: "25.95", selling: "26.50" },
    { currency: "NZD 🇳🇿", denom: "100", buying: "19.45", selling: "20.00" },
    { currency: "PHP 🇵🇭", denom: "1000", buying: "0.62", selling: "0.66" },
    { currency: "NOK 🇳🇴", denom: "100", buying: "3.22", selling: "3.30" },
    { currency: "SEK 🇸🇪", denom: "100", buying: "3.18", selling: "3.25" },
    { currency: "DKK 🇩🇰", denom: "100", buying: "5.01", selling: "5.20" },
    { currency: "IDR 🇮🇩", denom: "100000", buying: "0.0022", selling: "0.0024" },
    { currency: "THB 🇹🇭", denom: "100", buying: "0.00", selling: "0.00" },
  ];

  const itemsPerPage = 18;
  const totalPages = Math.ceil(rates.length / itemsPerPage);

  const [pageIndex, setPageIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % totalPages);
    }, 10000); // เปลี่ยนหน้าทุก 10 วินาที
    return () => clearInterval(interval);
  }, [totalPages]);

  const currentRates = rates.slice(
    pageIndex * itemsPerPage,
    pageIndex * itemsPerPage + itemsPerPage
  );

  const formatDateThai = (date) => {
    const months = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `Date: ${day} ${month} ${year} | Time: ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center p-6">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold text-yellow-500">TX Exchange co,.Ltd</h1>
        <h2 className="text-xl font-semibold text-yellow-500">MC125660031</h2>
        <p className="text-sm text-gray-600 mt-1">
          {formatDateThai(currentTime)}
        </p>
      </div>

      <h2 className="text-xl font-bold text-yellow-500 mb-4 text-center bg-yellow-100 px-6 py-1 rounded-full">
        RATE
      </h2>

      <div className="w-full max-w-4xl shadow-md rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 bg-yellow-400 text-black font-semibold py-2 px-4">
          <div>Currency</div>
          <div>Denom</div>
          <div>Buy</div>
          <div>Sell</div>
        </div>

        {/* Table Rows */}
        {currentRates.map((rate, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 px-4 py-2 border-b border-yellow-300 ${
              index % 2 === 0 ? "bg-white" : "bg-yellow-50"
            }`}
          >
            <div>{rate.currency}</div>
            <div>{rate.denom}</div>
            <div className="text-green-600 font-semibold">{rate.buying}</div>
            <div className="text-red-500 font-semibold">{rate.selling}</div>
          </div>
        ))}

        <div className="text-xs text-center text-gray-500 py-3">
          *Rates are subject to change without notice
        </div>
      </div>
    </div>
  );
}