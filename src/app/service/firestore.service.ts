import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


interface Navs {
  id: string;
  name: string;
  // ... other properties
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private NavsCollection: AngularFirestoreCollection<Navs>;

  constructor(private afs: AngularFirestore) {
    this.NavsCollection = this.afs.collection<Navs>('navs'); // Replace 'items' with your collection name
    console.log(this.NavsCollection)
  }

  getItems(): Observable<Navs[]> {
    return this.NavsCollection.valueChanges();
  }
}
