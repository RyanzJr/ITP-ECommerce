import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, 
  DocumentReference } from '@angular/fire/firestore';
import { map, take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';


 
export interface Idea {
  id?: string,
  name: string,
  notes: string,
  price: string,
  image?: string,
  size?: [],
  series: string,
  category: string,
}



export interface priceSize{
    id: string;
    price: string;
    size: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private ideas: Observable<Idea[]>;
  private ideaCollection: AngularFirestoreCollection<Idea>;
  private priceSizes: Observable<priceSize[]>;
  private priceSizeCollection: AngularFirestoreCollection<priceSize>;

  list:any;
  list1: any;
 
  constructor(private afs: AngularFirestore) {
    this.ideaCollection = this.afs.collection<Idea>('ideas');
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

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
 
  getIdeas(): Observable<Idea[]> {
    return this.ideas;
  }
 
  getIdea(id: string): Observable<Idea> {
    return this.ideaCollection.doc<Idea>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }
  
  addIdea(idea: Idea): Promise<DocumentReference> {
    return this.ideaCollection.add(idea);
  }
 
  updateIdea(idea: Idea): Promise<void> {
    return this.ideaCollection.doc(idea.id).update({ name: idea.name, notes: idea.notes, price: idea.price, image: idea.image, id:idea.id });
  }
 
  deleteIdea(id: string): Promise<void> {
    return this.ideaCollection.doc(id).delete();
  }

  getPriceSizes(): Observable<priceSize[]> {
    return this.priceSizes;
  }
 
  getPriceSize(id:string):Observable<priceSize[]> {
    return this.afs.collection<priceSize>('priceSize', ref => ref.where('id', '==', id)).valueChanges().pipe(
      
    );
   
        
    //return this.priceSizeCollection = this.afs.collection<priceSize>('priceSize', ref => ref.where('id', '==', id))
   
    /*return this.afs.collection<priceSize>('priceSize', ref => ref.where('id', '==', id).limit(1)).valueChanges().pipe(
      take(1),
    );*/
  }
  
  addPriceSize(idea: priceSize): Promise<DocumentReference> {
    return this.priceSizeCollection.add(idea);
  }
}