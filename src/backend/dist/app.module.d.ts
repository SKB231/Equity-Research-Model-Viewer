import { FirebaseService } from './firebase/firebase.service';
import { yahooFinanceService } from './yahooFinance/yahooFinance.service';
export declare class AppModule {
    private firebaseService;
    private yahooFinanceService;
    constructor(firebaseService: FirebaseService, yahooFinanceService: yahooFinanceService);
}
