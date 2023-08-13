import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { yahooFinanceService } from './yahooFinance.service';

@Controller('yahooFinance')
export class yahooFinanceController {
  constructor(private service: yahooFinanceService) {}
  @Post('getCompanyStock')
  async getCompanyStock(
    @Body()
    body: {
      startDate: string;
      endDate: string;
      symbol: string;
      frequency: string;
    },
  ) {
    return await this.service.getHistoricalPrice({
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      symbol: body.symbol,
      frequency: body.frequency,
    });
  }

  @Post('getCompanyStockInfo')
  async getCompanyPresentStockInfo(@Body() body: { symbol: string }) {
    return await this.service.getStockInfo(body);
  }

  @Get('getCurrentStockPrice/:symbol')
  async getYHV8Info(@Param('symbol') symbol: string) {
    return await this.service.getCurrentStockPrice(symbol);
  }
}
