import { CosmetiqueService } from './../services/Cosmetique.service';
import { Component, OnInit } from '@angular/core';
import { Cosmetique } from '../model/Cosmetique.model';
import { Classification } from '../model/classification.model';

@Component({
  selector: 'app-recherche-par-classtfication',
  templateUrl: './recherche-par-classtfication.component.html',
})
export class RechercheParClasstficationComponent implements OnInit {
  cosmetiques: Cosmetique[] = [];
  IdClassification: number | undefined;
  classifications: Classification[] = [];
  NomClassification: string = '';

  constructor(private cosmetiqueService: CosmetiqueService) {}

  ngOnInit(): void {
    this.cosmetiqueService.listerClassifications().subscribe(response => {
      this.classifications = response;
    });
  }

  onChange(): void {
    if (this.IdClassification !== undefined && !isNaN(this.IdClassification)) {
      this.cosmetiqueService.rechercheParClassification(this.IdClassification)
        .subscribe(cosmetiques => {
          this.cosmetiques = cosmetiques;
        });
    } else {
      console.error('IdClassification is not a valid number. Cannot make the request.');
    }
  }  
}
