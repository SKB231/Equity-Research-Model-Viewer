import { Firestore, DocumentData } from 'firebase/firestore';
import { Company } from './databaseTypes';
export declare class FirebaseService {
    fireStore: Firestore;
    constructor();
    addCompany(newCompany: Company): Promise<{
        msg: string;
        other?: undefined;
    } | {
        msg: string;
        other: any;
    }>;
    getCompanyRefByTicker(ticker: string): Promise<any>;
    deleteCompany(companyID: string): Promise<{
        msg: string;
        other?: undefined;
    } | {
        msg: string;
        other: any;
    }>;
    getCompany(companyID: string): Promise<DocumentData | import("@firebase/firestore").DocumentSnapshot<DocumentData>>;
    getCompanyCollection(): Promise<any[]>;
}
