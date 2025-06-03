// const [data, setData] = useState<{ nse: any[]; bse: any[] }>({ nse: [], bse: [] });
"use client";

import { useEffect, useState, useMemo } from "react";
import SectorTable from "@/components/sector-table";

type Sector = {
  sector: string;
  price?: number;
  change?: number;
  percentChange?: number;
  previousClose?: number;
  dayHigh?: number;
  dayLow?: number;
  lastUpdate?: string;
  marketState: string,
};

export default function SectorsPage() {
  const [sectors, setSectors] = useState<{ nse: Sector[] }>({ nse: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSectors() {
      try {
        const res = await fetch("/api/sectoral");
        const jsonData = await res.json();
        setSectors({ nse: jsonData.nse });
        // console.log(jsonData);
        
      } catch (error) {
        console.error("Failed to fetch sector data: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSectors();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sectoral Performance</h1>
      <div className="grid md:grid-cols-1 gap-10">
        <SectorTable
          title="NSE Sectors"
          sectors={sectors.nse}
          loading={loading}
        />
        {/* Expandable: add more sector tables here */}
      </div>
    </div>
  );
}
