'use client'
import { Loader2, TriangleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";

type IndexData = {
  name: string;
  country: string;
  price: number;
  change: number;
  percentChange: number;
};

type GlobalData = {
  usMarkets: Record<string, IndexData>;
  europeanMarkets: Record<string, IndexData>;
  asianMarkets: Record<string, IndexData>;
  australianMarket: Record<string, IndexData>;
  canadianMarket: Record<string, IndexData>;
};

export default function GlobalIndicesPage() {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/market-quote");
        if (!res.ok) throw new Error("Failed to fetch market data");
        const data = await res.json();
        setGlobalData(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <p className="text-gray-600 text-sm">Loading global indices...</p>
      </div>
    );
  }``

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <TriangleAlert className="h-6 w-6 text-red-600" />
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  const renderTable = (title: string, data: Record<string, IndexData>) => (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 ">{title}</h2>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium uppercase">Index</th>
              <th className="px-4 py-3 text-left font-medium uppercase">Country</th>
              <th className="px-4 py-3 text-right font-medium uppercase">Price</th>
              <th className="px-4 py-3 text-right font-medium uppercase">Change</th>
              <th className="px-4 py-3 text-right font-medium uppercase">% Change</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(data).map(([key, index]) => {
              const isPositive = index.change >= 0;
              return (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{index.name}</td>
                  <td className="px-4 py-3 text-gray-600">{index.country}</td>
                  <td className="px-4 py-3 text-right font-mono text-gray-900">{index.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                      {isPositive ? "▲" : "▼"} {index.change.toFixed(2)}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {index.percentChange.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">🌐 Global Indices Overview</h1>
      {globalData && (
        <>
          {renderTable("US Markets", globalData.usMarkets)}
          {renderTable("European Markets", globalData.europeanMarkets)}
          {renderTable("Asian Markets", globalData.asianMarkets)}
          {renderTable("Australian Market", globalData.australianMarket)}
          {renderTable("Canadian Market", globalData.canadianMarket)}
        </>
      )}
    </main>
  );
}
