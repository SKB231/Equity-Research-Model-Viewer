import { Module } from '@nestjs/common';
import { yahooFinanceController } from './yahooFinance.controller';
import { yahooFinanceService } from './yahooFinance.service';

@Module({
  controllers: [yahooFinanceController],
  providers: [yahooFinanceService],
})
export class yahooFinanceModule {}
