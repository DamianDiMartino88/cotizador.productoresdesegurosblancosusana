import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/app/Models/Email';
import { OptionQuotation } from 'src/app/Models/OptionQuotation';
import { Quotation } from 'src/app/Models/Quotation';
import { QuotationResponse } from 'src/app/Models/QuotationResponse';
import { MailingService } from 'src/app/Services/mailing.service';
import { VehiclesService } from 'src/app/Services/vehicles.service';

@Component({
  selector: 'app-offer-information',
  templateUrl: './offer-information.component.html',
  styleUrls: ['./offer-information.component.css']
})
export class OfferInformationComponent implements OnInit {

  constructor(private _vehiclesService: VehiclesService,              
    private _mailingService: MailingService,              
    private _formBuilder: FormBuilder,
    private _router: Router) {
      
  }

  email: Email = new Email();
  quotation: Quotation = new Quotation();
  optionQuotation: QuotationResponse = new QuotationResponse();
  tercerosBasico:OptionQuotation = new OptionQuotation()
  tercerosPremium:OptionQuotation = new OptionQuotation()
  todoRiesgo:OptionQuotation = new OptionQuotation()
  todoRiesgoVip:OptionQuotation = new OptionQuotation()

  ngOnInit(): void {

    

    this.quotation = this._vehiclesService.getQuotation();
    this.optionQuotation = this._vehiclesService.getOptionQuotation();
    console.log(this.quotation);
    this.tercerosBasico = this.quotation.quotationResponse.cotizaciones[2]
    this.tercerosPremium = this.quotation.quotationResponse.cotizaciones[3]
    this.todoRiesgo = this.quotation.quotationResponse.cotizaciones[4]
    this.todoRiesgoVip = this.quotation.quotationResponse.cotizaciones[5]

    console.log(this.quotation.quotationResponse)
    console.log(this.todoRiesgo)
    console.log(this.todoRiesgo.prima.importePrima)
  }

  

callSetTimeOut(){
  setTimeout(() =>{
    console.log("HOLIS")
    
  },10000)
}
  handleAcceptance(offer:OptionQuotation){

    console.log(offer.prima.importePrima);
    let es0Km = (this.quotation.es0Km) ? "0KM" : "";
    this.email.email = "susanaiblanco@gmail.com";
    this.email.subject = "Solicitud Alta de Poliza";
    this.email.message = 
    `El usuario ${this.quotation.nombresDelAsegurado} ${this.quotation.apellidosDelAsegurado}
  Email: ${this.quotation.userEmail}
  Telefono: ${this.quotation.telefonoDelAsegurado}
  Ubicacion del Riesgo: ${this.quotation.descripcionLocalidad}, ${this.quotation.descripcionProvincia}, Codigo Postal: ${this.quotation.codigoPostal}
  Solicito el Alta de Poliza ${offer.descripcionDeProducto} por el vehiculo ${this.quotation.nombreMarca} - ${this.quotation.nombreMarcaModelo}, ${this.quotation.anioFabricacion} ${es0Km}
  Con el Valor de: ${offer.prima.importePrima}`

    //this._mailingService.mailSender(this.email);
    this._vehiclesService.setSelectedOffer(offer);
    this._router.navigate(['Thanks'], { skipLocationChange: true });
  }

}
