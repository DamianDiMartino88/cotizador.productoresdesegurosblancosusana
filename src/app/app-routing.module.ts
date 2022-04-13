import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdressInfoComponent } from './Pages/adress-info/adress-info.component';
import { ContractInfoComponent } from './Pages/contract-info/contract-info.component';
import { FinalViewComponent } from './Pages/final-view/final-view.component';
import { OfferInformationComponent } from './Pages/offer-information/offer-information.component';
import { PersonalInfoComponent } from './Pages/personal-info/personal-info.component';
import { UploadDocumentComponent } from './Pages/upload-document/upload-document.component';
import { VehicleInfoComponent } from './Pages/vehicle-info/vehicle-info.component';

const routes: Routes = [
  { path: "", component: VehicleInfoComponent},
  { path: "VehicleInfo", component: VehicleInfoComponent},
  { path: "PersonalInfo", component: PersonalInfoComponent},
  { path: "AdressInfo", component: AdressInfoComponent},
  { path: "ContractInfo", component: ContractInfoComponent},
  { path: "OfferInformation", component: OfferInformationComponent},
  { path: "UploadDocument", component: UploadDocumentComponent},
  { path: "Thanks", component: FinalViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
