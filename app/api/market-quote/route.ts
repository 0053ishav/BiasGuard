import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET() {
  try {
    const [
      // US
      dow, nasdaq, sp500,
      // Europe
      ftse, dax, cac40, ibex, euroStoxx50,
      // Asia
      nikkei, hangSeng, shanghai, kospi,
      // Australia
      asx200,
      // Canada
      tsx,
      // India
      nifty, sensex
    ] = await Promise.all([
      // US Markets
      yahooFinance.quote("^DJI"),        // Dow Jones
      yahooFinance.quote("^IXIC"),       // Nasdaq
      yahooFinance.quote("^GSPC"),       // S&P 500

      // European Markets
      yahooFinance.quote("^FTSE"),       // UK FTSE 100
      yahooFinance.quote("^GDAXI"),      // Germany DAX
      yahooFinance.quote("^FCHI"),       // France CAC 40
      yahooFinance.quote("^IBEX"),       // Spain IBEX 35
      yahooFinance.quote("^STOXX50E"),   // Euro Stoxx 50

      // Asian Markets
      yahooFinance.quote("^N225"),       // Japan Nikkei 225
      yahooFinance.quote("^HSI"),        // Hong Kong Hang Seng
      yahooFinance.quote("000001.SS"),   // China Shanghai Composite
      yahooFinance.quote("^KS11"),       // South Korea KOSPI

      // Australia
      yahooFinance.quote("^AXJO"),       // Australia S&P/ASX 200

      // Canada
      yahooFinance.quote("^GSPTSE"),     // Canada TSX Composite

      // India
      yahooFinance.quote("^NSEI"),       // Nifty 50
      yahooFinance.quote("^BSESN"),      // Sensex

    ]);

    const data = {
      indianMarkets: {
        nifty: { name: "Nifty 50", country: "India", price: nifty.regularMarketPrice, change: nifty.regularMarketChange, percentChange: nifty.regularMarketChangePercent, },
        sensex: { name: "Sensex", country: "India", price: sensex.regularMarketPrice, change: sensex.regularMarketChange, percentChange: sensex.regularMarketChangePercent,},
      },
      usMarkets: {
        dow: { name: "Dow Jones Industrial Average", country: "USA", price: dow.regularMarketPrice, change: dow.regularMarketChange, percentChange: dow.regularMarketChangePercent },
        nasdaq: { name: "NASDAQ Composite", country: "USA", price: nasdaq.regularMarketPrice, change: nasdaq.regularMarketChange, percentChange: nasdaq.regularMarketChangePercent },
        sp500: { name: "S&P 500", country: "USA", price: sp500.regularMarketPrice, change: sp500.regularMarketChange, percentChange: sp500.regularMarketChangePercent },
      },
      europeanMarkets: {
        ftse: { name: "FTSE 100", country: "United Kingdom", price: ftse.regularMarketPrice, change: ftse.regularMarketChange, percentChange: ftse.regularMarketChangePercent },
        dax: { name: "DAX", country: "Germany", price: dax.regularMarketPrice, change: dax.regularMarketChange, percentChange: dax.regularMarketChangePercent },
        cac40: { name: "CAC 40", country: "France", price: cac40.regularMarketPrice, change: cac40.regularMarketChange, percentChange: cac40.regularMarketChangePercent },
        ibex: { name: "IBEX 35", country: "Spain", price: ibex.regularMarketPrice, change: ibex.regularMarketChange, percentChange: ibex.regularMarketChangePercent },
        euroStoxx50: { name: "Euro Stoxx 50", country: "Europe", price: euroStoxx50.regularMarketPrice, change: euroStoxx50.regularMarketChange, percentChange: euroStoxx50.regularMarketChangePercent },
      },
      asianMarkets: {
        nikkei: { name: "Nikkei 225", country: "Japan", price: nikkei.regularMarketPrice, change: nikkei.regularMarketChange, percentChange: nikkei.regularMarketChangePercent },
        hangSeng: { name: "Hang Seng", country: "Hong Kong", price: hangSeng.regularMarketPrice, change: hangSeng.regularMarketChange, percentChange: hangSeng.regularMarketChangePercent },
        shanghai: { name: "Shanghai Composite", country: "China", price: shanghai.regularMarketPrice, change: shanghai.regularMarketChange, percentChange: shanghai.regularMarketChangePercent },
        kospi: { name: "KOSPI", country: "South Korea", price: kospi.regularMarketPrice, change: kospi.regularMarketChange, percentChange: kospi.regularMarketChangePercent },
      },
      australianMarket: {
        asx200: { name: "S&P/ASX 200", country: "Australia", price: asx200.regularMarketPrice, change: asx200.regularMarketChange, percentChange: asx200.regularMarketChangePercent },
      },
      canadianMarket: {
        tsx: { name: "S&P/TSX Composite", country: "Canada", price: tsx.regularMarketPrice, change: tsx.regularMarketChange, percentChange: tsx.regularMarketChangePercent },
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}