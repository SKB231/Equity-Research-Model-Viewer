import { FirebaseService } from './firebase.service';
import { Company } from './databaseTypes';
export declare class FirebaseController {
    private service;
    constructor(service: FirebaseService);
    getCompanyCollection(): Promise<any[]>;
    getCompanyFromId(id: string): Promise<import("@firebase/firestore").DocumentData | import("@firebase/firestore").DocumentSnapshot<import("@firebase/firestore").DocumentData>>;
    deleteCompanyById(body: {
        companyId: string;
    }): Promise<{
        msg: string;
        other?: undefined;
    } | {
        msg: string;
        other: any;
    }>;
    createCompany(body: Company): Promise<{
        msg: string;
        other?: undefined;
    } | {
        msg: string;
        other: any;
    }>;
}
