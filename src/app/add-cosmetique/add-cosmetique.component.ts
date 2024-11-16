import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cosmetique } from '../model/Cosmetique.model';
import { CosmetiqueService } from '../services/Cosmetique.service';
import { Classification } from "../model/classification.model";
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-cosmetique',
  templateUrl: './add-cosmetique.component.html',
  styles: []
})
export class AddCosmetiqueComponent implements OnInit {

  newCosmetique = new Cosmetique();
  Classifications!: Classification[];
  newIdClas!: number;
  newClassification!: Classification;

  uploadedImage!: File;
  imagePath: any;

  constructor(
    private router: Router,
    private cosmetiqueService: CosmetiqueService
  ) { }

  ngOnInit(): void {
    this.cosmetiqueService.listerClassifications().subscribe(clas => {
      this.Classifications = clas;
      console.log(clas);
    });
  }
  /*
    addCosmetique() {
      this.newCosmetique.classification = this.Classifications.find(clas => clas.idClas == this.newIdClas)!;
      this.cosmetiqueService.ajouterCosmetique(this.newCosmetique).subscribe(cosm => {
        console.log(cosm);
        this.router.navigate(['cosmetiques']);
      });
    }
  */
  /* 
    addCosmetique() {
      this.cosmetiqueService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img: Image) => {
          this.newCosmetique.image = img;
          this.newCosmetique.classification = this.Classifications.find(cat => cat.idClas == this.newIdClas)!;
          this.cosmetiqueService.ajouterCosmetique(this.newCosmetique).subscribe(() => {
              this.router.navigate(['cosmetiques']);
            });
        });
    }
   */

  addCosmetique() {
    this.newCosmetique.classification = this.Classifications.find(clas => clas.idClas == this.newIdClas)!;
    this.cosmetiqueService.ajouterCosmetique(this.newCosmetique).subscribe((cosm) => {
      this.cosmetiqueService.uploadImageFS(this.uploadedImage,
        this.uploadedImage.name, cosm.idCosmetique).subscribe((response: any) => { }
        );
      this.router.navigate(['cosmetiques']);
    });
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
}
