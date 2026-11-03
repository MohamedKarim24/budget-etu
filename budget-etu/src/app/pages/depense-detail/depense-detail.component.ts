import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { DepensesService } from '../../core/depenses.service';
import { Depense } from '../../shared/depense';

@Component({
  selector: 'app-depense-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="max-width: 500px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      @if (resource.isLoading()) {
        <p>Chargement des détails de la dépense...</p>
      } @else if (resource.error() || !resource.value()) {
        <!-- Gestion d'une dépense introuvable (ex: /depenses/999) -->
        <h2>Dépense introuvable</h2>
        <p>La dépense demandée n'existe pas ou a été supprimée.</p>
        <a routerLink="/depenses" style="color: #007bff; text-decoration: underline;">Retour à la liste</a>
      } @else {
        <h2>Détail de la dépense</h2>
        <p><strong>Libellé :</strong> {{ resource.value()?.libelle }}</p>
        <p><strong>Montant :</strong> {{ resource.value()?.montant | currency:'EUR' }}</p>
        <p><strong>Date :</strong> {{ resource.value()?.date }}</p>
        <p><strong>Catégorie :</strong> {{ resource.value()?.categorie }}</p>
        
        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
          <button (click)="supprimer()" style="background: #dc3545; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">Supprimer</button>
          <a routerLink="/depenses" style="padding: 0.5rem 1rem; background: #6c757d; color: white; text-decoration: none; border-radius: 4px; display: inline-block;">Retour</a>
        </div>
      }
    </div>
  `
})
export class DepenseDetailComponent {
  @Input() id!: string; // Reçoit l'id de la route automatiquement[cite: 3]

  private depensesService = inject(DepensesService);
  private router = inject(Router);

  // Charge la dépense spécifique avec httpResource[cite: 3]
  readonly resource = httpResource<Depense>(() => `http://localhost:3000/depenses/${this.id}`);

  supprimer() {
    if (confirm('Voulez-vous vraiment supprimer cette dépense ?')) {
      this.depensesService.supprimer(this.id).subscribe({
        next: () => {
          this.depensesService.depensesResource.reload(); // Recharge la liste globale[cite: 3]
          this.router.navigate(['/depenses']); // Revient sur /depenses[cite: 3]
        },
        error: (err) => console.error("Erreur lors de la suppression", err)
      });
    }
  }
}