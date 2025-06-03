import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET() {
    try {
        // Define sector indices (NSE & BSE examples)
        const NSE_SECTORS = [
            { symbol: '^NSEBANK', name: 'NSE Banking' },
            { symbol: '^CNXIT', name: 'NSE IT' },
            { symbol: '^CNXPHARMA', name: 'NSE Pharma' },
            { symbol: '^CNXAUTO', name: 'NSE Auto' },
            { symbol: '^CNXFMCG', name: 'NSE FMCG' },
            { symbol: '^CNXENERGY', name: 'NSE Energy' },
            { symbol: '^CNXMETAL', name: 'NSE Metal' },
            { symbol: '^CNXREALTY', name: 'NSE Realty' },
            { symbol: '^CNXPSUBANK', name: 'NSE PSU Banks' },
            { symbol: '^CNXMEDIA', name: 'NSE Media' },
            { symbol: '^CNXINFRA', name: 'NSE Infrastructure' },
            { symbol: '^CNXFIN', name: 'NSE Financial Services' },
        ];


        const BSE_SECTORS = [
            { symbol: '^BSESN', name: 'BSE Sensex' },
            { symbol: '^BSEIT', name: 'BSE IT' },
            { symbol: '^BSEHEALTH', name: 'BSE Healthcare' },
            { symbol: '^BSEAUTO', name: 'BSE Auto' },
            { symbol: '^BSEBANK', name: 'BSE Bankex' },
        ];

        // Fetch sector data
        const nseData = await Promise.all(
            NSE_SECTORS.map(async (s) => {
                try {

                    const quote = await yahooFinance.quote(s.symbol);
                    // console.log("nse qoute: ", quote);
                    return {
                        sector: s.name,
                        price: quote.regularMarketPrice,
                        previousClose: quote.regularMarketPreviousClose,
                        change: quote.regularMarketChange,
                        percentChange: quote.regularMarketChangePercent,
                        dayHigh: quote.regularMarketDayHigh,
                        dayLow: quote.regularMarketDayLow,
                        lastUpdate: quote.regularMarketTime
                            ? new Date(quote.regularMarketTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                            : null,
                        isUp: quote.regularMarketChange !== undefined ? quote.regularMarketChange >= 0 : null,
                        marketState: quote.marketState,
                    };

                }
                catch (error) {
                    console.error(`Failed to fetch data for ${s.symbol}:`, error);
                    return {
                        sector: s.name,
                        price: null,
                        change: null,
                        percentChange: null,
                        error: 'Failed to fetch',
                    };
                }
            })
        );

        // const bseData = await Promise.all(
        //   BSE_SECTORS.map(async (s) => {
        //     const quote = await yahooFinance.quote(s.symbol);
        //     return {
        //       sector: s.name,
        //       price: quote.regularMarketPrice,
        //       change: quote.regularMarketChange,
        //       percentChange: quote.regularMarketChangePercent,
        //     };
        //   })
        // );

        // return NextResponse.json({ nse: nseData, bse: bseData });
        return NextResponse.json({ nse: nseData });
    } catch (error) {
        console.error('Error fetching sectoral data:', error);
        return NextResponse.json({ error: 'Failed to fetch sectoral data' }, { status: 500 });
    }
}
