import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { FirebaseService } from './firebase/firebase.service';
import { yahooFinanceModule } from './yahooFinance/yahooFinance.module';
import { yahooFinanceService } from './yahooFinance/yahooFinance.service';

@Module({
  imports: [FirebaseModule, yahooFinanceModule],
  providers: [FirebaseService, yahooFinanceService],
})
export class AppModule {
  constructor(
    private firebaseService: FirebaseService,
    private yahooFinanceService: yahooFinanceService,
  ) {}
}
