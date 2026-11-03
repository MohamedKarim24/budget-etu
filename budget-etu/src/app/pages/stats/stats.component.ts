import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepensesService } from '../../core/depenses.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 600px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <h2>Statistiques du mois</h2>

      <!-- Modification du budget en direct -->
      <div style="margin-bottom: 1.5rem;">
        <label style="font-weight: bold; display: block; margin-bottom: 0.5rem;">Budget mensuel (€) :</label>
        <input 
          type="number" 
          [ngModel]="budgetMensuel()" 
          (ngModelChange)="budgetMensuel.set($event)" 
          style="padding: 0.5rem; width: 100%; border: 1px solid #ccc; border-radius: 4px;"
        />
      </div>

      <!-- Alerte rouge si le budget est dépassé -->
      @if (totalDepense() > budgetMensuel()) {
        <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 4px; margin-bottom: 1.5rem; font-weight: bold;">
          ⚠️ Alerte : Vous avez dépassé votre budget mensuel !
        </div>
      }

      <!-- Chiffres clés calculés avec computed -->
      <div style="margin-bottom: 1.5rem; line-height: 1.6;">
        <p><strong>Total dépensé ce mois :</strong> {{ totalDepense() | currency:'EUR' }}</p>
        <p><strong>Reste à dépenser :</strong> {{ resteADepenser() | currency:'EUR' }}[cite: 3]</p>
        <p><strong>Catégorie la plus coûteuse :</strong> {{ categorieLaPlusCouteuse() }}[cite: 3]</p>
      </div>

      <!-- Barre de progression en CSS -->
      <div style="margin-bottom: 1rem;">
        <p style="margin-bottom: 0.5rem;">Part du budget consommée : {{ pourcentageConsomme() | number:'1.0-0' }}%[cite: 3]</p>
        <div style="background: #e9ecef; border-radius: 4px; overflow: hidden; height: 20px;">
          <div 
            [style.width.%]="pourcentageConsomme()" 
            [style.background]="totalDepense() > budgetMensuel() ? '#dc3545' : '#28a745'"
            style="height: 100%; transition: width 0.3s ease;"
          ></div>
        </div>
      </div>
    </div>
  `
})
export class StatsComponent {
  private depensesService = inject(DepensesService);
  readonly resource = this.depensesService.depensesResource;

  // Signal budget mensuel avec valeur de départ 700[cite: 3]
  readonly budgetMensuel = signal<number>(700);

  // Mois en cours (ex: '2026-10')
  readonly moisCourant = '2026-10';

  // Dépenses filtrées pour le mois en cours
  readonly depensesMois = computed(() => {
    const data = this.resource.value();
    if (!data) return [];
    return data.filter(d => d.date.startsWith(this.moisCourant));
  });

  // Total dépensé calculé avec un computed[cite: 3]
  readonly totalDepense = computed(() => {
    return this.depensesMois().reduce((acc, d) => acc + d.montant, 0);
  });

  // Reste à dépenser calculé avec un computed[cite: 3]
  readonly resteADepenser = computed(() => {
    return this.budgetMensuel() - this.totalDepense();
  });

  // Pourcentage consommé pour la barre de progression
  readonly pourcentageConsomme = computed(() => {
    const budget = this.budgetMensuel();
    if (budget <= 0) return 100;
    return (this.totalDepense() / budget) * 100;
  });

  // Catégorie la plus coûteuse calculée avec un computed[cite: 3]
  readonly categorieLaPlusCouteuse = computed(() => {
    const depenses = this.depensesMois();
    if (depenses.length === 0) return 'Aucune';

    const totauxParCat: Record<string, number> = {};
    for (const d of depenses) {
      totauxParCat[d.categorie] = (totauxParCat[d.categorie] || 0) + d.montant;
    }

    let catMax = 'Aucune';
    let maxMontant = -1;
    for (const [cat, montant] of Object.entries(totauxParCat)) {
      if (montant > maxMontant) {
        maxMontant = montant;
        catMax = cat;
      }
    }
    return catMax;
  });
}