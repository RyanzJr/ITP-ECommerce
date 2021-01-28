import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, 
  DocumentReference } from '@angular/fire/firestore';
import { first, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
 
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
  //public profileObj: User 

 
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
      take(1)
    );
  }
  getUserad(id: string): Observable<User[]> {
    return this.afs.collection<User>('profile', ref => ref.where('uid', '==', id).limit(1)).valueChanges().pipe(
      take(1)
    );
    
  }

  // getUser(id: string): Observable<User> {
  //   return this.userCollection.doc<User>(id).valueChanges().pipe(
  //     take(1),
  //     map(idea => {
  //       idea.id = id;
  //       return idea
  //     })
  //   );
  // }

  getUserByEmail(email: string): Observable<User[]> {

    //console.log(this.profileObj)

    this.afs.collection<User>('profile', ref => ref.where('Email', '==', email).limit(1)).valueChanges().subscribe(data => console.log(data))

    return this.afs.collection<User>('profile', ref => ref.where('Email', '==', email).limit(1)).valueChanges().pipe(
      take(1),
     
    );

  

    // const myObserver = {
    //   next: x => profileObj = x,
    //   error: err => console.error('Observer got an error: ' + err),
    //   complete: () => console.log('Observer got a complete notification'),
    // };
    //const profile =  await this.afs.collection<User>('profile', ref => ref.where('Email', '==', email)).valueChanges().subscribe(data => profileObj = data[0]);
    //this.afs.collection<User>('profile', ref => ref.where('Email', '==', email)).valueChanges().subscribe(data => console.log(data[0].Username));

    //this.afs.collection<User>('profile', ref => ref.where('Email', '==', email)).valueChanges().subscribe(data => localStorage.setItem('Username', data[0].Username));
    //console.log(profileObj) 
    //profileObj = {Username:"hehe", "Admin": true, "Image": "22", "Contact": "22", Gender:"Male", Company:"asb"}
    //localStorage.setItem('Username', profileObj.Username)
    //localStorage.setItem('Admin', stringify(profileObj.Admin))
    //return profileObj;


  }

  checkAllUsers(){
    this.afs.collection('profile').valueChanges().subscribe(val => console.log(val))
  }
 
  addUser(user: User): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }
 
  updateUser(user: User): Promise<void> {
    return this.userCollection.doc(user.id).update({ Username: user.Username, Gender: user.Gender, Company: user.Company, Contact:user.Contact, Image:user.Image });
  }
 
  deleteUser(id: string): Promise<void> {
    return this.userCollection.doc(id).delete();
  }
}