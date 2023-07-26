"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const console_1 = require("console");
let FirebaseService = exports.FirebaseService = class FirebaseService {
    constructor() {
        const firebaseConfig = {
            apiKey: 'AIzaSyD2lY0aBbscEFboYkNEbC082rSiVMSlrnw',
            authDomain: 'dcf-viewer.firebaseapp.com',
            projectId: 'dcf-viewer',
            storageBucket: 'dcf-viewer.appspot.com',
            messagingSenderId: '173731336635',
            appId: '1:173731336635:web:1d7b208434fa6378e9749e',
        };
        const app = (0, app_1.initializeApp)(firebaseConfig);
        this.fireStore = (0, firestore_1.getFirestore)(app);
    }
    async addCompany(newCompany) {
        try {
            console.log(newCompany);
            const q = (0, firestore_1.query)((0, firestore_1.collection)(this.fireStore, 'companies'), (0, firestore_1.where)('ticker', '==', newCompany.ticker));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            let id = null;
            querySnapshot.forEach((doc) => {
                id = doc.id;
            });
            if (id) {
                await (0, firestore_1.setDoc)((0, firestore_1.doc)(this.fireStore, 'companies', id), newCompany);
                return { msg: 'Successfully modified the company.' };
            }
            await (0, firestore_1.addDoc)((0, firestore_1.collection)(this.fireStore, 'companies'), newCompany);
            return { msg: 'The company information was added successfully.' };
        }
        catch (e) {
            return {
                msg: `There was an error with adding the company: ${e.message}`,
                other: e.stack,
            };
        }
    }
    async getCompanyRefByTicker(ticker) {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(this.fireStore, 'companies'), (0, firestore_1.where)('ticker', '==', ticker));
        const querySnapshot = await (0, firestore_1.getDocs)(q);
        querySnapshot.forEach((doc) => {
            return doc;
        });
        return null;
    }
    async deleteCompany(companyID) {
        try {
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(this.fireStore, 'companies', companyID));
            return { msg: 'Company has been deleted successfully' };
        }
        catch (e) {
            return {
                msg: `There was an error with deleting the company: ${e.message}`,
                other: e.stack,
            };
        }
    }
    async getCompany(companyID) {
        const docRef = (0, firestore_1.doc)(this.fireStore, 'companies', companyID);
        try {
            const doc = await (0, firestore_1.getDoc)(docRef);
            if (doc.exists()) {
                const data = doc.data();
                return data;
            }
            else {
                console.log('Does not exist');
                throw (0, console_1.error)();
            }
            return doc;
        }
        catch (e) {
            console.log('Error getting Company Document with ID ', companyID);
        }
    }
    async getCompanyCollection() {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(this.fireStore, 'companies'));
        const querySnapshot = await (0, firestore_1.getDocs)(q);
        const returnData = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            returnData.push({ id: doc.id, data: doc.data() });
        });
        return returnData;
    }
};
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map