import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable, from} from 'rxjs'
import { Plan } from '../../model/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanFirebaseService {

  firestore = inject(Firestore)
  plansCollection = collection(this.firestore, 'plans')

  getPlans(): Observable<Plan[]>{
    return collectionData(this.plansCollection, {
      idField: 'id',
    }) as Observable<Plan[]>;
  }

  addPlan(uid:string, day:string, pid:string): Observable<string>{
    const planToCreat = {uid, day, pid}
    const promis = addDoc(this.plansCollection, planToCreat).then(
      (response) => response.id
    )
      return from(promis)
  }
}
