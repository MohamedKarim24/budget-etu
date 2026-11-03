import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Depense } from '../shared/depense';

@Injectable({
  providedIn: 'root'
})
export class DepensesService {
  readonly depensesResource = httpResource<Depense[]>('http://localhost:3000/depenses');
}