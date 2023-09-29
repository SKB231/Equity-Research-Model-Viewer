export declare class yahooFinanceService {
    getHistoricalPrice({ startDate, endDate, symbol, frequency }: {
        startDate: any;
        endDate: any;
        symbol: any;
        frequency: any;
    }): Promise<import("yahoo-stock-api").APIresponse>;
    getStockInfo({ symbol }: {
        symbol: any;
    }): Promise<import("yahoo-stock-api").APIresponse>;
    getCurrentStockPrice(symbol: any): Promise<string>;
}
