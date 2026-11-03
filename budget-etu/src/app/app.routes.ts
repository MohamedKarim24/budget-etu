import { Routes } from '@angular/router';
import { DepenseListComponent } from './pages/depense-list/depense-list.component';
import { DepenseAjoutComponent } from './pages/depense-ajout/depense-ajout.component';
import { DepenseDetailComponent } from './pages/depense-detail/depense-detail.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="text-align: center; margin-top: 4rem;">
      <h2>404 - Page introuvable</h2>
      <p>La page que vous recherchez n'existe pas.</p>
      <a routerLink="/depenses" style="color: #007bff;">Retourner à l'accueil</a>
    </div>
  `
})
export class Page404Component {}

export const routes: Routes = [
  { path: '', redirectTo: 'depenses', pathMatch: 'full' },
  { path: 'depenses', component: DepenseListComponent },
  { path: 'ajouter', component: DepenseAjoutComponent },
  { path: 'depenses/:id', component: DepenseDetailComponent },
  { 
    path: 'stats', 
    loadComponent: () => import('./pages/stats/stats.component').then(m => m.StatsComponent) 
  },
  { path: '**', component: Page404Component }
];