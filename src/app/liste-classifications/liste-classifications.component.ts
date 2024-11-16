import { Component, OnDestroy, OnInit } from '@angular/core';
import { Classification } from '../model/classification.model';
import { CosmetiqueService } from '../services/Cosmetique.service';

@Component({
  selector: 'app-liste-classifications',
  templateUrl: './liste-classifications.component.html',
  styles: [
  ]
})
export class ListeClassificationsComponent implements OnInit {

  classifications!: Classification[];

  updatedClas: Classification = { idClas: 0, nomClas: "" };

  ajout:boolean=true;


  constructor(private cosmetiqueService: CosmetiqueService) { }

  ngOnInit(): void {
    this.chargerClassifications();
  }


  chargerClassifications() {
    this.cosmetiqueService.listerClassifications().subscribe(clas => {
      this.classifications = clas;
      console.log(clas);
    });
  }
  classificationUpdated(clas: Classification) {
    console.log("Clas updated event", clas);
    this.cosmetiqueService.ajouterClassification(clas).subscribe(() => this.chargerClassifications());
  }
  updateClas(clas: Classification) {
    this.updatedClas = clas;
    this.ajout=false;
  }




}
