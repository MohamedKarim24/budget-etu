import { Component, computed, inject, signal } from '@angular/core';
import { DepensesService } from '../../core/depenses.service';
import { DepenseCardComponent } from '../../shared/depenses-card/depenses-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-depense-list',
  standalone: true,
  imports: [CommonModule, DepenseCardComponent, FormsModule],
  templateUrl: './depense-list.component.html',
})
export class DepenseListComponent {
  private depensesService = inject(DepensesService);
  
  readonly resource = this.depensesService.depensesResource;

  readonly mois = signal<string>('2026-10');
  readonly categorie = signal<string>('');

  readonly depensesTriees = computed(() => {
    const data = this.resource.value();
    if (!data) return [];
    return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  readonly depensesFiltrees = computed(() => {
    const depenses = this.depensesTriees();
    const m = this.mois();
    const cat = this.categorie();

    return depenses.filter(depense => {
      const moisDepense = depense.date.substring(0, 7);
      const matchMois = m ? moisDepense === m : true;
      const matchCat = cat ? depense.categorie === cat : true;

      return matchMois && matchCat;
    });
  });

  readonly total = computed(() => {
    return this.depensesFiltrees().reduce((acc, depense) => acc + depense.montant, 0);
  });

  reessayer() {
    this.resource.reload();
  }
}