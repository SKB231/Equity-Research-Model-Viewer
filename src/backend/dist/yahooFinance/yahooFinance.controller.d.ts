import { yahooFinanceService } from './yahooFinance.service';
export declare class yahooFinanceController {
    private service;
    constructor(service: yahooFinanceService);
    getCompanyStock(body: {
        startDate: string;
        endDate: string;
        symbol: string;
        frequency: string;
    }): Promise<import("yahoo-stock-api").APIresponse>;
    getCompanyPresentStockInfo(body: {
        symbol: string;
    }): Promise<import("yahoo-stock-api").APIresponse>;
    getYHV8Info(symbol: string): Promise<string>;
}
