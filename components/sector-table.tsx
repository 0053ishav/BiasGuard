"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type Sector = {
  sector: string;
  price?: number;
  change?: number;
  percentChange?: number;
  previousClose?: number;
  dayHigh?: number;
  dayLow?: number;
  lastUpdate?: string;
};

export default function SectorTable({
  title,
  sectors,
  loading,
}: {
  title: string;
  sectors: Sector[];
  loading: boolean;
}) {
  const COLUMNS: { label: string; key: keyof Sector | "trend" }[] = [
    { label: "Sector", key: "sector" },
    { label: "Price", key: "price" },
    { label: "Change", key: "change" },
    { label: "% Change", key: "percentChange" },
    { label: "Prev Close", key: "previousClose" },
    { label: "Day High", key: "dayHigh" },
    { label: "Day Low", key: "dayLow" },
    { label: "Last Update", key: "lastUpdate" },
  ];

  

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Sector;
    direction: "asc" | "desc";
  } | null>(null);

  function handleSort(key: keyof Sector | "trend") {
    if (key === "trend") return;
    if (sortConfig && sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  }

  const sortedSectors = useMemo(() => {
    if (!sortConfig) return sectors;
    return [...sectors].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [sectors, sortConfig]);

  function generateProTips(data: Sector[]) {
    if (!data.length) return ["No data available to generate tips."];

    const tips: string[] = [];
    const bigChangeThreshold = 1.5;

    const bigGainers = data.filter(
      (s) => (s.percentChange ?? 0) >= bigChangeThreshold
    );
    const bigLosers = data.filter(
      (s) => (s.percentChange ?? 0) <= -bigChangeThreshold
    );

    if (bigGainers.length) {
      tips.push(
        `Watch these top gainers: ${bigGainers
          .map((s) => s.sector)
          .join(", ")} — strong positive momentum.`
      );
    }
    if (bigLosers.length) {
      tips.push(
        `Caution: These sectors showed significant drops: ${bigLosers
          .map((s) => s.sector)
          .join(", ")} — potential volatility ahead.`
      );
    }

    const volatileSectors = data.filter(
      (s) =>
        s.dayHigh && s.dayLow && (s.dayHigh - s.dayLow) / (s.price || 1) > 0.01
    );
    if (volatileSectors.length) {
      tips.push(
        `High volatility alert in sectors: ${volatileSectors
          .map((s) => s.sector)
          .join(", ")} — consider risk management strategies.`
      );
    }

    tips.push(
      "Remember to diversify your portfolio and monitor macroeconomic news."
    );

    return tips;
  }

  const proTips = generateProTips(sortedSectors);

  const SortArrow = ({ direction }: { direction: "asc" | "desc" }) => (
    <span className="ml-1 text-muted-foreground">
      {direction === "asc" ? "▲" : "▼"}
    </span>
  );

  const skeletonRows = 6;

  return (
    // <section className="bg-white dark:bg-muted rounded-md p-6 shadow-sm w-full">
    <section className="rounded-md p-6 shadow-sm w-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="overflow-auto max-h-[600px] custom-scrollbar">
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map(({ label, key }) => (
                <TableHead
                  key={key}
                  onClick={() => handleSort(key as keyof Sector)}
                  className="cursor-pointer select-none" 
                >
                  <div className="flex items-center">
                    {label}
                    {sortConfig?.key === key && (
                      <SortArrow direction={sortConfig.direction} />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: skeletonRows }).map((_, i) => (
                  <TableRow key={i}>
                    {Array(COLUMNS.length)
                      .fill(0)
                      .map((_, j) => (
                        <TableCell key={j}>
                          <div className="h-4 w-full max-w-[80px] bg-gray-200 rounded animate-pulse" />
                        </TableCell>
                      ))}
                  </TableRow>
                ))
              : sortedSectors.map((s) => (
                  <TableRow key={s.sector}>
                    <TableCell>{s.sector}</TableCell>
                    <TableCell>{s.price?.toFixed(2) ?? "N/A"}</TableCell>
                    <TableCell
                      className={`${
                        (s.change ?? 0) >= 0 ? "text-positive" : "text-negative"
                      }`}
                    >
                      {(s.change ?? 0) >= 0 ? "+" : ""}
                      {s.change?.toFixed(2) ?? "N/A"}
                    </TableCell>
                    <TableCell
                      className={`${
                        (s.percentChange ?? 0) >= 0
                          ? "text-positive"
                          : "text-negative"
                      }`}
                    >
                      {(s.percentChange ?? 0) >= 0 ? "+" : ""}
                      {s.percentChange?.toFixed(2) ?? "N/A"}%
                    </TableCell>
                    <TableCell>
                      {s.previousClose?.toFixed(2) ?? "N/A"}
                    </TableCell>
                    <TableCell>{s.dayHigh?.toFixed(2) ?? "N/A"}</TableCell>
                    <TableCell>{s.dayLow?.toFixed(2) ?? "N/A"}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {s.lastUpdate ?? "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {sortConfig && (
        <div className="mt-4 text-right">
          <button
            onClick={() => setSortConfig(null)}
            className="text-sm px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Reset Sort
          </button>
        </div>
      )}

      {!loading && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded shadow-sm transition-colors duration-300">
          <h3 className="font-semibold mb-3 text-yellow-700 text-xl">
            Pro Tips
          </h3>
          <ul className="list-disc list-inside space-y-2 text-yellow-800 leading-relaxed">
            {proTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
