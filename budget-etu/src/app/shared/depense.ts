export type Categorie = 'Alimentation' | 'Logement' | 'Transport' | 'Loisirs' | 'Études';

export interface Depense {
  id: string;          
  libelle: string;
  montant: number;     
  date: string;        
  categorie: Categorie;
}

export const CATEGORIES: Categorie[] = ['Alimentation', 'Logement', 'Transport', 'Loisirs', 'Études'];