import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge-categorie',
  standalone: true,
  templateUrl: './badge-categorie.component.html',
})
export class BadgeCategorieComponent {
  readonly categorie = input.required<string>();
}