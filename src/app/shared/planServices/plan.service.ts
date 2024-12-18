import { Injectable, signal } from '@angular/core';
import { Plan } from '../../model/plan';
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  plansSig = signal<Plan[]>([]);
}
