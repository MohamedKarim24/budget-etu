import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Depense } from '../../shared/depense';

@Component({
  selector: 'app-depenses-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card" style="border: 1px solid #ddd; padding: 1rem; margin-bottom: 1rem; border-radius: 6px; background: white;">
      <!-- Le libellé devient un lien vers /depenses/:id -->
      <h3><a [routerLink]="['/depenses', depense.id]" style="color: #007bff; text-decoration: none;">{{ depense.libelle }}</a></h3>
      <p>{{ depense.date }}</p>
      <p><strong>{{ depense.montant | currency:'EUR' }}</strong> - {{ depense.categorie }}</p>
    </div>
  `
})
export class DepenseCardComponent {
  @Input({ required: true }) depense!: Depense;
}