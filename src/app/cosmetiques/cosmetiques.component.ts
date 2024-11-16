import { CosmetiqueService } from './../services/Cosmetique.service';
import { Component, OnInit } from '@angular/core';
import { Cosmetique } from '../model/Cosmetique.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Import Router from @angular/router
import { Image } from '../model/image.model';

@Component({
  selector: 'app-cosmetiques',
  templateUrl: './cosmetiques.component.html'
})
export class CosmetiquesComponent implements OnInit {

  cosmetiques!: Cosmetique[]; // Corrected type to Cosmetique[]
  apiurl: string = 'http://localhost:9095/cosmetiques/api';

  constructor(
    private cosmetiqueService: CosmetiqueService, // Changed service name to CosmetiqueService
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chargerCosmetiques(); // Changed method name
  }
  /*
    chargerCosmetiques() { // Changed method name
      this.cosmetiqueService.listeCosmetiques().subscribe(cosmetiques => { // Changed method name and service method name
        console.log(cosmetiques);
        this.cosmetiques = cosmetiques;
  
  
        this.cosmetiques.forEach((cosm) => {
          this.cosmetiqueService
            .loadImage(cosm.image.idImage)
            .subscribe((img: Image) => {
              cosm.imageStr = 'data:' + img.type + ';base64,' + img.image;
            });
        });
      });
    }
  */
  supprimerCosmetique(cosmetique: Cosmetique) { // Changed parameter type to Cosmetique
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.cosmetiqueService.supprimerCosmetique(cosmetique.idCosmetique).subscribe(() => { // Changed method name and parameter name
        console.log("Cosmetique supprimé"); // Changed log message
        this.chargerCosmetiques();
      });
    }
  }
  /*
    chargerCosmetiques() {
      this.cosmetiqueService.listeCosmetiques().subscribe(cosms => {
        this.cosmetiques = cosms;
        this.cosmetiques.forEach((cosm) => {
          cosm.imageStr = 'data:' + cosm.images[0].type + ';base64,' + cosm.images[0].image;
        });
      });
    }
      */

    chargerCosmetiques() {
    this.cosmetiqueService.listeCosmetiques().subscribe(cosms => {
      this.cosmetiques = cosms;
    });
  }
}
