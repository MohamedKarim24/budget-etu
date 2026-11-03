import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DepensesService } from '../../core/depenses.service';

@Component({
  selector: 'app-depense-ajout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 500px; margin: 2rem auto; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: white;">
      <h2>Ajouter une dépense</h2>

      <form (submit)="$event.preventDefault(); onSubmit()">
        
        <!-- Libellé -->
        <div style="margin-bottom: 1.2rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Libellé :</label>
          <input 
            type="text" 
            [ngModel]="libelle()" 
            (ngModelChange)="libelle.set($event)" 
            (blur)="toucheLibelle.set(true)"
            name="libelle" 
            placeholder="Ex: Courses"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
          @if (toucheLibelle() && libelleInvalide) {
            <small style="color: red; display: block; margin-top: 0.25rem;">Le libellé est obligatoire (2 caractères minimum).</small>
          }
        </div>

        <!-- Montant -->
        <div style="margin-bottom: 1.2rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Montant (€) :</label>
          <input 
            type="number" 
            step="0.01" 
            [ngModel]="montant()" 
            (ngModelChange)="montant.set($event)" 
            (blur)="toucheMontant.set(true)"
            name="montant" 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
          @if (toucheMontant() && montantInvalide) {
            <small style="color: red; display: block; margin-top: 0.25rem;">Le montant doit être supérieur ou égal à 0,01 €.</small>
          }
        </div>

        <!-- Date -->
        <div style="margin-bottom: 1.2rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Date :</label>
          <input 
            type="date" 
            [ngModel]="date()" 
            (ngModelChange)="date.set($event)" 
            (blur)="toucheDate.set(true)"
            name="date" 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
          @if (toucheDate() && dateInvalide) {
            <small style="color: red; display: block; margin-top: 0.25rem;">La date est obligatoire.</small>
          }
        </div>

        <!-- Catégorie -->
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Catégorie :</label>
          <select 
            [ngModel]="categorie()" 
            (ngModelChange)="categorie.set($event)" 
            (blur)="toucheCategorie.set(true)"
            name="categorie"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Alimentation">Alimentation</option>
            <option value="Loisirs">Loisirs</option>
            <option value="Logement">Logement</option>
            <option value="Transport">Transport</option>
            <option value="Études">Études</option>
          </select>
          @if (toucheCategorie() && categorieInvalide) {
            <small style="color: red; display: block; margin-top: 0.25rem;">La catégorie est obligatoire.</small>
          }
        </div>

        <!-- Bouton Enregistrer -->
        <button 
          type="submit" 
          [disabled]="formulaireInvalide"
          style="width: 100%; padding: 0.75rem; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;"
          [style.opacity]="formulaireInvalide ? '0.5' : '1'"
        >
          Enregistrer
        </button>
      </form>
    </div>
  `
})
export class DepenseAjoutComponent {
  private depensesService = inject(DepensesService);
  private router = inject(Router);

  libelle = signal('');
  montant = signal<number | null>(null);
  date = signal('');
  categorie = signal('');

  toucheLibelle = signal(false);
  toucheMontant = signal(false);
  toucheDate = signal(false);
  toucheCategorie = signal(false);

  get libelleInvalide() {
    return this.libelle().trim().length < 2;
  }

  get montantInvalide() {
    const m = this.montant();
    return m === null || m < 0.01;
  }

  get dateInvalide() {
    return !this.date();
  }

  get categorieInvalide() {
    return !this.categorie();
  }

  get formulaireInvalide() {
    return this.libelleInvalide || this.montantInvalide || this.dateInvalide || this.categorieInvalide;
  }

  onSubmit() {
    if (this.formulaireInvalide) return;

    const nouvelleDepense = {
      libelle: this.libelle(),
      montant: Number(this.montant()),
      date: this.date(),
      categorie: this.categorie() as any
    };

    this.depensesService.ajouter(nouvelleDepense).subscribe({
      next: () => {
        this.depensesService.depensesResource.reload();
        this.router.navigate(['/depenses']);
      },
      error: (err) => console.error("Erreur lors de l'ajout", err)
    });
  }
}