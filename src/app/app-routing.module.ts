import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CosmetiquesComponent  } from './cosmetiques/cosmetiques.component';
import { AddCosmetiqueComponent } from './add-cosmetique/add-cosmetique.component';
import { UpdateCosmetiqueComponent } from './update-cosmetique/update-cosmetique.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CosmetiqueGuard } from './cosmetique.guard';
import {RechercheParClasstficationComponent} from './recherche-par-classtfication/recherche-par-classtfication.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeClassificationsComponent } from './liste-classifications/liste-classifications.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';


//, canActivate:[CosmetiqueGuard]

const routes: Routes = [
  {path: "cosmetiques", component : CosmetiquesComponent },
  {path: "add-cosmetique", component : AddCosmetiqueComponent },
  {path: "update-cosmetique/:id", component: UpdateCosmetiqueComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "rechercheParClassification", component : RechercheParClasstficationComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "", redirectTo: "cosmetiques", pathMatch: "full" },
  {path: "listeClassifications", component : ListeClassificationsComponent},
  {path:'register',component:RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
