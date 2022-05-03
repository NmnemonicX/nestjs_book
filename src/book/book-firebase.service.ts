import { Inject, Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;

@Injectable()
export class BookFirebaseService {
  constructor(@Inject(Firestore) private readonly firebase: Firestore) {}
  relationName = `Book`;

  create(data): Promise<any> {
    return this.firebase.collection(this.relationName).add(data);
  }

  findOne(id: string): Promise<any> {
    return this.firebase.collection(this.relationName).doc(id).get();
  }
  async findAll(): Promise<any[]> {
    const res = [];
    const info = await this.firebase.collection(this.relationName).get();
    info.forEach((doc) => {
      res.push(doc.data());
    });
    return res;
  }

  update(id: string, data): Promise<any> {
    const docRef = this.firebase.collection(this.relationName).doc(id);
    return docRef.update(data);
  }

  delete(id: string): Promise<any> {
    return this.firebase.collection(this.relationName).doc(id).delete();
  }
}
