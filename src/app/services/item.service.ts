import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Items } from '../model/items';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})



export class ItemService {

  userId: string;

  constructor(private db: AngularFirestore,
    private AuthService: AuthService) {

    this.AuthService.getCurrentUser().subscribe(data => this.userId = data.uid);
  }

  public addItem(item: Items): Promise<DocumentReference> {

    return this.db.collection('users/' + this.userId + 'items').add(item);

  }

  public getItems(): Observable<Items[]> {

    return this.db.collection('users/' + this.userId + '/items').snapshotChanges()
      .pipe(
        map(
          snaps => snaps.map(
            snap => <Items>{
              id: snap.payload.doc.id,
              ...snap.payload.doc.data() as Items
            }
          )
        )
      );
  }

  public deleteItemById(id: string): Promise<void> {

    return this.db.collection('users/' + this.userId + '/items').doc(id).delete();

  }

  public updateItemById(id: string, item: Items): Promise<void> {

    return this.db.collection('users/' + this.userId + '/items').doc(id).set(item);

  }
  public getItemById(id: string): Observable<Items> {

    return this.db.collection('users/' + this.userId + '/items').doc<Items>(id).valueChanges();

  }
}
