"use client";

import TableSkeleton from "@/components/TableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, TriangleAlert, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

type IndexData = {
  name: string;
  country: string;
  price: number;
  change: number;
  percentChange: number;
  marketState: string;
};

type GlobalData = {
  usMarkets: Record<string, IndexData>;
  europeanMarkets: Record<string, IndexData>;
  asianMarkets: Record<string, IndexData>;
  australianMarket: Record<string, IndexData>;
  canadianMarket: Record<string, IndexData>;
  indianMarkets: Record<string, IndexData>;
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
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🌐 Global Indices Overview
      </h1>
      {/* Show multiple skeleton tables for each market section */}
      <TableSkeleton rows={2} />
      <TableSkeleton rows={3} />
      <TableSkeleton rows={5} />
      <TableSkeleton rows={4} />
      <TableSkeleton rows={1} />
      <TableSkeleton rows={1} />
          </main>
  );
}

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <TriangleAlert className="h-6 w-6 text-destructive" />
        <p className="text-destructive font-semibold">{error}</p>
      </div>
    );
  }

  function getClockColor(marketState: string): string | null {
    switch (marketState) {
      case "REGULAR":
        return "text-green-500";
      case "PRE":
        return "text-yellow-500";
      case "POST":
        return "text-yellow-500";
      case "PREPRE":
      case "POSTPOST":
      case "HOLIDAY":
        return "text-red-500";
      default:
        return null;
    }
  }

  const renderTable = (title: string, data: Record<string, IndexData>) => (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Index</TableHead>
              <TableHead className="text-left">Country</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">% Change</TableHead>
              {/* <TableHead className="text-right">Market State</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(data).map(([key, index]) => {
              const isPositive = index.change >= 0;
              const clockColor = getClockColor(index.marketState);
              return (
                <TableRow key={key}>
                  <TableCell className="font-semibold flex items-center gap-1">
                    {clockColor && (
                      <Clock className={`h-4 w-4 ${clockColor}`} />
                    )}
                    {index.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {index.country}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {index.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        isPositive ? "text-positive" : "text-negative"
                      }`}
                    >
                      {isPositive ? "▲" : "▼"} {index.change.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`text-right font-bold ${
                      isPositive ? "text-positive" : "text-negative"
                    }`}
                  >
                    {index.percentChange.toFixed(2)}%
                  </TableCell>
                  {/* <TableCell className="text-right text-muted-foreground uppercase font-mono">
                    {index.marketState}
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🌐 Global Indices Overview
      </h1>
      {globalData && (
        <>
          {renderTable("Indian Markets", globalData.indianMarkets)}
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
