import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Aditional } from 'src/app/Models/Aditional';
import { Email } from 'src/app/Models/Email';
import { OptionQuotation } from 'src/app/Models/OptionQuotation';
import { Quotation } from 'src/app/Models/Quotation';
import { QuotationResponse } from 'src/app/Models/QuotationResponse';
import { MailingService } from 'src/app/Services/mailing.service';
import { VehiclesService } from 'src/app/Services/vehicles.service';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.css'],
  providers: [DatePipe]

})
export class ContractInfoComponent implements OnInit {

  constructor(private _vehiclesService: VehiclesService,              
    private _mailingService: MailingService,              
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _datePipe: DatePipe) {
      
  }

paysQuantity: number[] = [];
paymentMethods: PayMethod[] = [];
ContractForm: FormGroup = new FormGroup({});
aditionalList: Aditional[] = []
selectedAditionals: Aditional[] = []
quotation: Quotation = new Quotation();
email: Email = new Email();
isFormCompleted: boolean = true;
isPolicyTypeCompleted: boolean = true;
isPaymentCompleted: boolean = true;
isQuotesCompleted: boolean = true;
isIVAConditionCompleted: boolean = true;
isIIBBConditionCompleted: boolean = true;
quotationReady: boolean = false;
isQuoting: boolean = false;
optionQuotation: QuotationResponse = new QuotationResponse();


ngOnInit(): void {
  this.isQuoting = false;
  this.quotation = this._vehiclesService.getQuotation();
  if(this.checkInfoCompletion()){
    this.formGenerator();
    this.aditionalList = this._vehiclesService.getAditionals();
    this.quotation = this._vehiclesService.getQuotation();
    this.ContractForm.get("cantidadDeCuotas")!.disable();
    }
}

checkInfoCompletion(): boolean{
  if(this.quotation.isVehicleInfoReady && this.quotation.isPersonalInfoReady && this.quotation.isAddressInfoReady){
    return true
    }
    else if(!this.quotation.isVehicleInfoReady){
      this._router.navigate(['VehicleInfo'], { skipLocationChange: true });
    }
    else if(!this.quotation.isPersonalInfoReady){
      this._router.navigate(['PersonalInfo'], { skipLocationChange: true });
    }
    else if(!this.quotation.isAddressInfoReady){
      this._router.navigate(['AdressInfo'], { skipLocationChange: true });
    }
  return true
}

formGenerator(){
  this.ContractForm = this._formBuilder.group({
    tipoDePoliza: ["Seleccione", new FormControl([
    Validators.required,
    Validators.minLength(2)
    ])
    ],
    medioDePago: ["Seleccione",new FormControl([
    Validators.required
    ])
    ],
    cantidadDeCuotas: ["Seleccione",new FormControl([
    Validators.required,
    Validators.minLength(4)
    ])
    ],
    codigoCondicionIVA: ["Seleccione",new FormControl([
    Validators.required
    ])
    ],
    codigoCondicionIIBB: ["Seleccione",new FormControl([
    Validators.required
    ])
    ],
    codigoDeAdicional: ["Seleccione",new FormControl([
    Validators.required
    ])
    ],
    direccionPiso: ["",new FormControl([
    Validators.required
    ])
    ],
    direccionDepto: ["",new FormControl([
    Validators.required
    ])
    ],
    codigoPostal: ["",new FormControl([
    Validators.required
    ])
    ]
  })
}

getPaysQuantity(){
    
  // this._vehiclesService.getBrandsList().subscribe((data: Brand[])=>{
  //   this.brandsList = data;
  // })
  var pays = this.getFormValue("tipoDePoliza");
    this.paysQuantity = [];
    this.paymentMethods = [];
    if(pays!="Seleccione"){
      switch (pays){
        case "M":
          this.paysQuantity.push(1)
          this.paymentMethods.push({key:"T",value:"Tarjeta de Credito"});
          this.ContractForm.get("cantidadDeCuotas")!.enable();
          break;
        
        case "S":
          this.paysQuantity.push(1,2,3,4,5,6)
          this.paymentMethods.push({key:"T",value:"Tarjeta de Credito"},{key:"E",value:"Debito por CBU"});
          this.ContractForm.get("cantidadDeCuotas")!.enable();
          break;

        case "A":
          this.ContractForm.get("cantidadDeCuotas")!.disable();
          break;
        
        case "P":
          this.ContractForm.get("cantidadDeCuotas")!.disable();
          break;
        
      }
      
    }else{
      this.ContractForm.get("cantidadDeCuotas")!.disable();
    }
}


addAditional(){
  var newAccessory = this.getFormValue("codigoDeAdicional");
  if(newAccessory !="Seleccione"){
    var array1 = [this.selectedAditionals.find(aditional => aditional.aditionalID == newAccessory)]
    if(array1[0] == undefined){
      this.selectedAditionals.push(this.aditionalList.filter(aditional => aditional.aditionalID == newAccessory)[0])
    }
    this.ContractForm.controls["codigoDeAdicional"].setValue("Seleccione")
  }
}

deleteAditional(selected: Aditional){
  console.log("Deleting "+selected.aditionalID)
  this.selectedAditionals=this.selectedAditionals.filter(aditional => aditional.aditionalID != selected.aditionalID)
}

handleContinue(){
    let es0Km = (this.quotation.es0Km) ? "0KM" : "";
    this.email.email = "susanaiblanco@gmail.com";
    this.email.subject = "Nueva Cotizacion";
    this.email.message = " El usuario " 
                        + this.quotation.nombresDelAsegurado 
                        + " "
                        + this.quotation.apellidosDelAsegurado 
                        + ", Email: "
                        + this.quotation.userEmail 
                        + " Cotizo el Vehiculo: " 
                        + this.quotation.nombreMarca 
                        + " - " 
                        + this.quotation.nombreMarcaModelo
                        + " "
                        + this.quotation.anioFabricacion
                        + " Con los Siguientes Valores de Polizas: <br>"
                        + this.quotation.anioFabricacion
                        + " "
                        + es0Km;

    //this._mailingService.mailSender(this.email);

  if(this.checkForm()){
    this.isQuoting = true;
    this.isFormCompleted = true
    this.quotation.tipoDePoliza = this.getFormValue("tipoDePoliza");
    this.quotation.medioDePago = this.getFormValue("medioDePago");
    this.quotation.cantidadDeCuotas = this.getFormValue("cantidadDeCuotas");
    this.quotation.codigoCondicionIVA = this.getFormValue("codigoCondicionIVA");
    //this.quotation.codigoCondicionIIBB = this.getFormValue("codigoCondicionIIBB");
    let date2 = new Date();
    this.quotation.fechaDesde = this._datePipe.transform(date2,'yyyy-MM-ddThh:mm:ss.SSSZZZZZ')
    console.log(date2)
    var months = (this.getFormValue("tipoDePoliza") == "M")? 1 : 6;
    let date3 = new Date(date2.setMonth(date2.getMonth() +months));
    console.log(date3)
    this.quotation.fechaHasta = this._datePipe.transform(date3,'yyyy-MM-ddThh:mm:ss.SSSZZZZZ');
    console.log(this._datePipe.transform(date3,'yyyy-MM-ddThh:mm:ss.SSSZZZZZ'))
    

    this._vehiclesService.sendQuotationRequest().subscribe((data: QuotationResponse) =>{
      this.optionQuotation = data;
      this.quotation.quotationResponse = this.optionQuotation;
      this._vehiclesService.setQuotation(this.quotation);
      this.quotationReady = true;
      console.log(this.quotation)
      console.log(this.quotationReady);
    });

    this._vehiclesService.setOptionQuotation(this.optionQuotation);
    this.callSetTimeOut();
    
  }
  else{
    this.isFormCompleted = false;
  }
}

callSetTimeOut(){
  var myInterval = setInterval(() =>{
    console.log("HOLIS INTERVAL")
    if(this.quotationReady){
      this._router.navigate(['/OfferInformation'], { skipLocationChange: true });
      clearInterval(myInterval);
    }
  },3000)
}

checkForm(){
  
  console.log(this.getFormValue("tipoDePoliza") != "Seleccione")
  console.log(this.getFormValue("medioDePago") != "Seleccione")
  console.log(this.getFormValue("cantidadDeCuotas") != "Seleccione")
  console.log(this.getFormValue("codigoCondicionIVA") != "Seleccione")
  //console.log(this.getFormValue("codigoCondicionIIBB") != "Seleccione")

  this.isPolicyTypeCompleted = this.getFormValue("tipoDePoliza") !== "Seleccione"
  this.isPaymentCompleted =this.getFormValue("medioDePago") !== "Seleccione"
  this.isQuotesCompleted = this.getFormValue("cantidadDeCuotas") !== "Seleccione"
  this.isIVAConditionCompleted = this.getFormValue("codigoCondicionIVA") !== "Seleccione"
  //this.isIIBBConditionCompleted = this.getFormValue("codigoCondicionIIBB") !== "Seleccione"
  return  this.isPolicyTypeCompleted &&
          this.isPaymentCompleted &&
          this.isQuotesCompleted && 
          this.isIVAConditionCompleted //&& 
          //this.isIIBBConditionCompleted;
}

handleBack(){
  this._router.navigate(['/AdressInfo'], { skipLocationChange: true });
}

  getFormValue(field: string) {
  return this.ContractForm.get(field)!.value;
  }

  get tipoDePoliza() {
    return this.ContractForm.get("tipoDePoliza");
  }

  get medioDePago() {
    return this.ContractForm.get("medioDePago");
  }

  get cantidadDeCuotas() {
    return this.ContractForm.get("cantidadDeCuotas");
  }

  get codigoCondicionIVA() {
    return this.ContractForm.get("codigoCondicionIVA");
  }

  // get codigoCondicionIIBB() {
  //   return this.ContractForm.get("codigoCondicionIIBB");
  // }

}

export class PayMethod{
  key=""
  value=""
}
