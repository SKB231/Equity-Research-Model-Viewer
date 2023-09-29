import { Injectable } from '@nestjs/common';
import YahooStockAPI from 'yahoo-stock-api';
import axios from 'axios';
@Injectable()
export class yahooFinanceService {
  async getHistoricalPrice({ startDate, endDate, symbol, frequency }) {
    const yahoo = new YahooStockAPI();

    // const startDate = new Date('08/21/2020');
    // const endDate = new Date('08/26/2020');
    try {
      const stocks = await yahoo.getHistoricalPrices({
        startDate,
        endDate,
        symbol,
        frequency,
      });
      return stocks;
    } catch (e) {
      console.error(e);
    }
  }

  async getStockInfo({ symbol }) {
    const yahoo = new YahooStockAPI();
    try {
      const stock = await yahoo.getSymbol({ symbol });
      return stock;
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * Uses YahooFinance V8 version
   * @param symbol
   */
  async getCurrentStockPrice(symbol) {
    try {
      const response = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
      );
      const returnData = await JSON.stringify(
        response.data?.chart['result'][0].meta,
      );
      return returnData;
    } catch (e) {
      console.log(e);
    }
  }
}
