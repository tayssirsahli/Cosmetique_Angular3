import { Component, OnInit } from '@angular/core';
import { Cosmetique } from '../model/Cosmetique.model'; // Changed import
import { ActivatedRoute, Router } from '@angular/router';
import { CosmetiqueService } from '../services/Cosmetique.service'; // Changed import
import { Classification } from "../model/classification.model";
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-cosmetique', // Changed selector
  templateUrl: './update-cosmetique.component.html' // Changed templateUrl
})
export class UpdateCosmetiqueComponent implements OnInit {

  currentCosmetique = new Cosmetique();
  classifications!: Classification[];
  updatedClasId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cosmetiqueService: CosmetiqueService
  ) { }
  /*
    ngOnInit(): void {
      this.cosmetiqueService.listerClassifications().subscribe(cats => {
        this.classifications = cats;
        console.log(cats);
      });
      this.cosmetiqueService.consulterCosmetique(this.activatedRoute.snapshot.params['id']).subscribe(cosmetique => {
        this.currentCosmetique = cosmetique;
        this.updatedClasId = this.currentCosmetique.classification.idClas;
  
  
        this.cosmetiqueService.loadImage(this.currentCosmetique.image.idImage)
          .subscribe((img: Image) => {
            this.myImage = 'data:' + img.type + ';base64,' + img.image;
          });
      });
    }
  */

  ngOnInit(): void {
    this.cosmetiqueService.listerClassifications().subscribe(cats => { this.classifications = cats; });
    this.cosmetiqueService.consulterCosmetique(this.activatedRoute.snapshot.params['id']).subscribe(cosm => {
      this.currentCosmetique = cosm;
      this.updatedClasId = cosm.classification.idClas;
    });

  }
  /*
  updateCosmetique() {
    this.currentCosmetique.classification = this.classifications.find(clas => clas.idClas == this.updatedClasId)!;

    if (this.isImageUpdated) {
      this.cosmetiqueService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img: Image) => {
        this.currentCosmetique.image = img;
        this.cosmetiqueService.updateCosmetique(this.currentCosmetique).subscribe((prod) => {
          this.router.navigate(['cosmetiques']);
        });
      });
    } else {
      this.cosmetiqueService.updateCosmetique(this.currentCosmetique).subscribe(prod => {
        this.router.navigate(['cosmetiques']);
      });
    }
  }
*/

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageCosmetique() {
    this.cosmetiqueService.uploadImageCosm(this.uploadedImage,
      this.uploadedImage.name, this.currentCosmetique.idCosmetique)
      .subscribe((img: Image) => {
        this.currentCosmetique.images.push(img);
      });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.cosmetiqueService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentCosmetique.images.indexOf(img, 0);
        if (index > -1) {
          this.currentCosmetique.images.splice(index, 1);
        }
      });
  }

  updateCosmetique() {
    this.currentCosmetique.classification = this.classifications.find(clas => clas.idClas == this.updatedClasId)!;
    this.cosmetiqueService.updateCosmetique(this.currentCosmetique).subscribe((cosm) => {
      this.router.navigate(['Cosmetiques']);
    });
  }
}
