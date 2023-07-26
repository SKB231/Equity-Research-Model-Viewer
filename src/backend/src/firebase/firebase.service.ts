import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  Firestore,
  deleteDoc,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  DocumentData,
  query,
  addDoc,
  where,
  DocumentReference,
} from 'firebase/firestore';
import { Company } from './databaseTypes';
import { error } from 'console';
@Injectable()
export class FirebaseService {
  fireStore: Firestore;

  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyD2lY0aBbscEFboYkNEbC082rSiVMSlrnw',
      authDomain: 'dcf-viewer.firebaseapp.com',
      projectId: 'dcf-viewer',
      storageBucket: 'dcf-viewer.appspot.com',
      messagingSenderId: '173731336635',
      appId: '1:173731336635:web:1d7b208434fa6378e9749e',
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    this.fireStore = getFirestore(app);
  }

  async addCompany(newCompany: Company) {
    try {
      console.log(newCompany);
      const q = query(
        collection(this.fireStore, 'companies'),
        where('ticker', '==', newCompany.ticker),
      );

      const querySnapshot = await getDocs(q);
      let id: string = null;
      querySnapshot.forEach((doc) => {
        id = doc.id;
      });
      if (id) {
        await setDoc(doc(this.fireStore, 'companies', id), newCompany);
        return { msg: 'Successfully modified the company.' };
      }

      await addDoc(collection(this.fireStore, 'companies'), newCompany);
      return { msg: 'The company information was added successfully.' };
    } catch (e: any) {
      return {
        msg: `There was an error with adding the company: ${e.message}`,
        other: e.stack,
      };
    }
  }

  async getCompanyRefByTicker(ticker: string): Promise<any> {
    const q = query(
      collection(this.fireStore, 'companies'),
      where('ticker', '==', ticker),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      return doc;
    });
    return null;
  }

  async deleteCompany(companyID: string) {
    try {
      await deleteDoc(doc(this.fireStore, 'companies', companyID));
      return { msg: 'Company has been deleted successfully' };
    } catch (e: any) {
      return {
        msg: `There was an error with deleting the company: ${e.message}`,
        other: e.stack,
      };
    }
  }

  async getCompany(companyID: string) {
    const docRef = doc(this.fireStore, 'companies', companyID);

    try {
      const doc = await getDoc(docRef);
      if (doc.exists()) {
        const data = doc.data();
        return data;
      } else {
        console.log('Does not exist');
        throw error();
      }
      return doc;
    } catch (e) {
      console.log('Error getting Company Document with ID ', companyID);
    }
  }

  async getCompanyCollection() {
    const q = query(collection(this.fireStore, 'companies'));
    const querySnapshot = await getDocs(q);
    const returnData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      returnData.push({ id: doc.id, data: doc.data() });
    });
    return returnData;
  }
}
