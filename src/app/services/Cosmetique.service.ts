import { ListeClassificationsComponent } from './../liste-classifications/liste-classifications.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cosmetique } from '../model/Cosmetique.model';
import { AuthService } from './auth.service';
import { Classification } from '../model/classification.model';
import { Image } from '../model/image.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CosmetiqueService {

  apiURL: string = 'http://localhost:9095/cosmetiques/api';
  apiURL_class: string = 'http://localhost:9095/cosmetiques/api/clas';

  cosmetiques !: Cosmetique[];
  classifications!: Classification[];

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  listeCosmetiques(): Observable<Cosmetique[]> {

    return this.http.get<Cosmetique[]>(this.apiURL + "/all");
  }

  ajouterCosmetique(cosmetique: Cosmetique): Observable<Cosmetique> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Cosmetique>(this.apiURL + "/addcos", cosmetique, { headers: httpHeaders });
  }

  supprimerCosmetique(id: number) {
    const url = `${this.apiURL}/delcos/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterCosmetique(id: number): Observable<Cosmetique> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Cosmetique>(url, { headers: httpHeaders });
  }

  trierCosmetiques() {
    this.cosmetiques = this.cosmetiques.sort((n1, n2) => {
      if (n1 && n2 && n1.idCosmetique && n2.idCosmetique) {
        if (n1.idCosmetique > n2.idCosmetique) {
          return 1;
        }
        if (n1.idCosmetique < n2.idCosmetique) {
          return -1;
        }
        return 0;
      }
      return 0;
    });

  }
  updateCosmetique(cosmetique: Cosmetique): Observable<Cosmetique> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.put<Cosmetique>(this.apiURL + "/updatecos", cosmetique, { headers: httpHeaders });
  }

  listerClassifications(): Observable<Classification[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Classification[]>(this.apiURL_class, { headers: httpHeaders });
  }

  rechercheParClassification(idClas: number): Observable<Cosmetique[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    const url = `${this.apiURL}/cosmetiqueClas/${idClas}`;
    return this.http.get<Cosmetique[]>(url, { headers: httpHeaders });
  }

  consulterClassification(id: number): Classification {
    const classificationTrouvee = this.classifications.find(clas => clas.idClas == id);
    if (classificationTrouvee) {
      return classificationTrouvee;
    } else {
      throw new Error(`Classification non trouvée pour l'ID : ${id}`);
    }
  }

  rechercherParNom(nom: string): Observable<Cosmetique[]> { // Changed method name
    const url = `${this.apiURL}/cosmetiqueByName/${nom}`;
    return this.http.get<Cosmetique[]>(url);
  }


  ajouterClassification(clas: Classification): Observable<Classification> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Classification>(this.apiURL_class + "/addclas", clas, { headers: httpHeaders });
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageCosm(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageCosm'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }
  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }

  uploadImageFS(file: File, filename: string, idCosm : number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idCosm}`;
    return this.http.post(url, imageFormData);
    }
 

}
