import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { AdressInfoComponent } from './Pages/adress-info/adress-info.component';
import { ContractInfoComponent } from './Pages/contract-info/contract-info.component';
import { FinalViewComponent } from './Pages/final-view/final-view.component';
import { OfferInformationComponent } from './Pages/offer-information/offer-information.component';
import { PersonalInfoComponent } from './Pages/personal-info/personal-info.component';
import { VehicleInfoComponent } from './Pages/vehicle-info/vehicle-info.component';
import { UploadDocumentComponent } from './Pages/upload-document/upload-document.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    AdressInfoComponent,
    ContractInfoComponent,
    FinalViewComponent,
    OfferInformationComponent,
    PersonalInfoComponent,
    VehicleInfoComponent,
    UploadDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
