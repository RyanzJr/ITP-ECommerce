import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, 
  DocumentReference } from '@angular/fire/firestore';
import { first, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
export interface User {
  id?: string,
  Username: string,
  Email?: string,
  Gender: string,
  Contact: string,
  Company: string,
  Image?: string,
  Admin?: boolean
}
 
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;
 
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('profile');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getUsers(): Observable<User[]> {
    return this.users;
  }
 
  getUser(id: string): Observable<User> {
    return this.userCollection.doc<User>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }

//   getUserByEmail(email: string): Observable<User> {
//     return this.afs.collection<User>('ideas', ref => ref.where('uid', '==', email).limit(1))
//     .valueChanges().pipe();
// }
 
  addUser(user: User): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }
 
  updateUser(user: User): Promise<void> {
    return this.userCollection.doc(user.id).update({ Username: user.Username, Gender: user.Gender, Company: user.Company, Contact:user.Contact });
  }
 
  deleteUser(id: string): Promise<void> {
    return this.userCollection.doc(id).delete();
  }
}