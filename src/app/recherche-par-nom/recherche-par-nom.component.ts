import { Component, OnInit } from '@angular/core';
import { Cosmetique } from '../model/Cosmetique.model';
import { CosmetiqueService } from '../services/Cosmetique.service';
import { Classification } from '../model/classification.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit {
  
  cosmetiques!: Cosmetique[];
  nomCosmetique!: string;
  classifications!: Classification[];
  searchTerm!: string;
  AllCosmetique!: Cosmetique[];
  
  constructor(private cosmetiqueService: CosmetiqueService) {}
  
  ngOnInit(): void {
    this.cosmetiqueService.listeCosmetiques().subscribe(cosmetiques => { 
      console.log(cosmetiques);
      this.cosmetiques = cosmetiques;
      this.AllCosmetique = cosmetiques; // Initialisation de AllCosmetique
    });
  }
  
  rechercherCosmetique() {
    this.cosmetiqueService.rechercherParNom(this.nomCosmetique).subscribe(cosmetiques => { 
      this.cosmetiques = cosmetiques; 
      this.AllCosmetique = cosmetiques; // Mise à jour de AllCosmetique avec les résultats de recherche
      console.log(cosmetiques);
    });
  }
  
  onKeyUp(filterText: string) {
    this.cosmetiques = this.AllCosmetique.filter(item =>
      item.nomCosmetique.toLowerCase().includes(filterText.toLowerCase()));
  }
}
