import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, 
  DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
export interface User {
  id?: string,
  Username: string,
  Email: String,
  Password: String,
  Gender: String,
  Contact: String,
  Company: String,
  Image: String,
}
 
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;
 
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('TestProfileUser');
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
 
  addUser(idea: User): Promise<DocumentReference> {
    return this.userCollection.add(idea);
  }
 
  updateUser(user: User): Promise<void> {
    return this.userCollection.doc(user.id).update({ Username: user.Username, Email: user.Email, Password: user.Password, Gender: user.Gender, Company: user.Company, Contact:user.Contact });
  }
 
  deleteUser(id: string): Promise<void> {
    return this.userCollection.doc(id).delete();
  }
}