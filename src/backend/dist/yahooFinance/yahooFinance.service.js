"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yahooFinanceService = void 0;
const common_1 = require("@nestjs/common");
const yahoo_stock_api_1 = require("yahoo-stock-api");
const axios_1 = require("axios");
let yahooFinanceService = exports.yahooFinanceService = class yahooFinanceService {
    async getHistoricalPrice({ startDate, endDate, symbol, frequency }) {
        const yahoo = new yahoo_stock_api_1.default();
        try {
            const stocks = await yahoo.getHistoricalPrices({
                startDate,
                endDate,
                symbol,
                frequency,
            });
            return stocks;
        }
        catch (e) {
            console.error(e);
        }
    }
    async getStockInfo({ symbol }) {
        const yahoo = new yahoo_stock_api_1.default();
        try {
            const stock = await yahoo.getSymbol({ symbol });
            return stock;
        }
        catch (e) {
            console.log(e);
        }
    }
    async getCurrentStockPrice(symbol) {
        var _a;
        try {
            const response = await axios_1.default.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
            const returnData = await JSON.stringify((_a = response.data) === null || _a === void 0 ? void 0 : _a.chart['result'][0].meta);
            return returnData;
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.yahooFinanceService = yahooFinanceService = __decorate([
    (0, common_1.Injectable)()
], yahooFinanceService);
//# sourceMappingURL=yahooFinance.service.js.map