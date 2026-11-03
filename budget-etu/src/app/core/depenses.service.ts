import { Injectable, inject } from '@angular/core';
import { httpResource, HttpClient } from '@angular/common/http';
import { Depense } from '../shared/depense';

@Injectable({
  providedIn: 'root'
})
export class DepensesService {
  private http = inject(HttpClient);

  readonly depensesResource = httpResource<Depense[]>(() => 'http://localhost:3000/depenses');

  ajouter(nouvelleDepense: Omit<Depense, 'id'>) {
    return this.http.post<Depense>('http://localhost:3000/depenses', nouvelleDepense);
  }
  supprimer(id: string | number) {
  return this.http.delete(`http://localhost:3000/depenses/${id}`);
}
}