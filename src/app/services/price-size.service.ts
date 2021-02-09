import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, 
  DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService, Idea } from './firebase.service';


export interface priceSize {
    id: string;
    price: string;
    size: string;
}

@Injectable({
  providedIn: 'root'
})
export class PriceSizeService {

  private priceSizes: Observable<priceSize[]>;
  private priceSizeCollection: AngularFirestoreCollection<priceSize>;
 
  constructor(private afs: AngularFirestore, private Idea: Idea) {
    this.priceSizeCollection = this.afs.collection<priceSize>('priceSize');
    this.priceSizes = this.priceSizeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPriceSizes(): Observable<priceSize[]> {
    return this.priceSizes;
  }
 
  getPriceSize(id: string): Observable<priceSize> {
    return this.priceSizeCollection.doc<priceSize>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }
  
  addPriceSize(idea: priceSize): Promise<DocumentReference> {
    return this.priceSizeCollection.add(idea);
  }
 
  updateIdea(idea: priceSize): Promise<void> {
    return this.priceSizeCollection.doc(idea.id).update({id: this.Idea.id, size:idea.size, price:idea.price  });
  }
 
  deleteIdea(id: string): Promise<void> {
    return this.priceSizeCollection.doc(id).delete();
  }


}
