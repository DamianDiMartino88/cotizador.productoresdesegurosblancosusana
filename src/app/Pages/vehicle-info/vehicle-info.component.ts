import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accessory } from 'src/app/Models/Accessory';
import { Brand } from 'src/app/Models/Brand';
import { CarModel } from 'src/app/Models/CarModel';
import { Email } from 'src/app/Models/Email';
import { InfoautoBrand } from 'src/app/Models/InfoautoBrand';
import { InfoautoModel } from 'src/app/Models/InfoautoModel';
import { Quotation } from 'src/app/Models/Quotation';
import { Use } from 'src/app/Models/Use';
import { MailingService } from 'src/app/Services/mailing.service';
import { VehiclesService } from 'src/app/Services/vehicles.service';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {

  constructor(private _vehiclesService: VehiclesService,              
    private _mailingService: MailingService,              
    private _formBuilder: FormBuilder,
    private _router: Router) 
    {                
    }

brandsList :Brand[] = [];
infoautoBrandsList :InfoautoBrand[] = [];
infoautoModelsList :InfoautoModel[] = [];
carModelsList :CarModel[] = [];
accessoriesList: Accessory[] = [];
usesList: Use[] = [];
selectedAccessories: Accessory[] = [];

quotation: Quotation = new Quotation();
email: Email = new Email();
VehiclesForm: FormGroup = new FormGroup({});
isFormCompleted:boolean = true;
isBrandCompleted:boolean = true;
isModelCompleted:boolean = true;
isYearCompleted:boolean = true;
isYearOk:boolean = true;
isUsageCompleted:boolean = true;
isEmailCompleted:boolean = true;
isAccesoriesListFull:boolean = false;

ngOnInit(): void {
this.quotation = this._vehiclesService.getQuotation();
this.selectedAccessories = this.quotation.accesoriosVehiculo;
this.formGenerator()
this.getBrands();
this.getAccessories();
this.getUses();
console.log(this.brandsList);
}

formGenerator(){
this.VehiclesForm = this._formBuilder.group({
codigoMarca: [(this.quotation.codigoMarca == "")? "Seleccione": this.quotation.codigoMarca, new FormControl([
Validators.required,
Validators.minLength(2)
])
],
carAccessory: ["Seleccione",new FormControl([
Validators.required
])
],
anioFabricacion: [(this.quotation.anioFabricacion == 0)? "": this.quotation.anioFabricacion,new FormControl([
Validators.required,
Validators.minLength(4)
])
],
codigoMarcaModelo: [(this.quotation.codigoMarcaModelo == "")? "Seleccione": this.quotation.codigoMarcaModelo,new FormControl([
Validators.required
])
],
userEmail: [(this.quotation.userEmail == "")? "": this.quotation.userEmail,new FormControl([
Validators.required,
Validators.email
])
],
es0Km: [false],
tieneAlarma: [false],
codigoDeUso: [(this.quotation.codigoDeUso == "")? "Seleccione": this.quotation.codigoDeUso,new FormControl([
Validators.required
])
]
})
}

getBrands(){
// this._vehiclesService.getBrandsList().subscribe((data: Brand[])=>{
//   this.brandsList = data;
// })
this.VehiclesForm.get("codigoMarca")!.disable();
this.VehiclesForm.get("codigoMarcaModelo")!.disable();
//this.brandsList = this._vehiclesService.getMockBrandsList();
this._vehiclesService.getBrandsList().subscribe((response)=>{
this.infoautoBrandsList = response;
console.log(this.infoautoBrandsList)
this.VehiclesForm.get("codigoMarca")!.enable();
}
);
}

getCarModels(){

// this._vehiclesService.getBrandsList().subscribe((data: Brand[])=>{
//   this.brandsList = data;
// })
var brandid = this.getFormValue("codigoMarca");
if(brandid!="Seleccione"){
//this.carModelsList = this._vehiclesService.getMockCarModelsList(brandid);
this._vehiclesService.getCarModelsList(brandid).subscribe((data: InfoautoModel[])=>{
this.infoautoModelsList = data;
this.VehiclesForm.get("codigoMarcaModelo")!.enable();
})
this.quotation.nombreMarca = this.infoautoBrandsList.filter((result) => result.id == brandid)[0].name;


console.log(this.quotation.nombreMarca)
}else{
this.VehiclesForm.controls["codigoMarcaModelo"].setValue("Seleccione")
this.VehiclesForm.get("codigoMarcaModelo")!.disable();
}
}

getAccessories(){
this.accessoriesList = this._vehiclesService.getCarAccessories();
}

getUses(){
this.usesList = this._vehiclesService.getMockUsesModelsList();
}

addAccessory(){
var newAccessory = this.getFormValue("carAccessory");
if(newAccessory !="Seleccione"){
var array1 = [this.selectedAccessories.find(accessory => accessory.AccessoryID == newAccessory)]
if(array1[0] == undefined){
this.selectedAccessories.push(this.accessoriesList.filter(accessory => accessory.AccessoryID == newAccessory)[0])
}
this.VehiclesForm.controls["carAccessory"].setValue("Seleccione")
}
this.isAccesoriesListFull = this.selectedAccessories.length > 0 ? true : false;
console.log(this.isAccesoriesListFull)
}

deleteAccessory(selected: Accessory){
this.selectedAccessories=this.selectedAccessories.filter(accessory => accessory.AccessoryID != selected.AccessoryID)
this.isAccesoriesListFull = this.selectedAccessories.length > 0 ? true : false;
}

checkValidation(){

}
handleContinue(){
//Mail Sender
if(this.checkForm()){
this.isFormCompleted = true
console.log(this.getFormValue("codigoMarcaModelo"))
this.quotation.codigoMarca = this.getFormValue("codigoMarca");
this.quotation.codigoMarcaModelo = this.getFormValue("codigoMarcaModelo");
this.quotation.anioFabricacion = this.getFormValue("anioFabricacion");
this.quotation.valorVehiculo = 0; // recibir valor de infoauto
this.quotation.codigoDeUso = this.getFormValue("codigoDeUso");
this.quotation.es0Km = this.getFormValue("es0Km");
this.quotation.tieneAlarma = this.getFormValue("tieneAlarma");
this.quotation.userEmail = this.getFormValue("userEmail");
this.quotation.accesoriosVehiculo = this.selectedAccessories;
this.quotation.isVehicleInfoReady = true;

this.email.email = "susanaiblanco@gmail.com";
this.email.subject = "Nueva Inicio de Cotizacion";
this.email.message = " El usuario " 
                + this.quotation.userEmail 
                + " Inicio una nueva consulta por el vehiculo: " 
                + this.quotation.nombreMarca 
                + " - " 
                + this.quotation.nombreMarcaModelo
                + " "
                + this.quotation.anioFabricacion;

this._vehiclesService.setQuotation(this.quotation);
this._mailingService.mailSender(this.email);

console.log(this.quotation)

this._router.navigate(['/PersonalInfo'], { skipLocationChange: true });
}
else{
this.isFormCompleted = false
}
}

handleBack(){

}

checkForm(){
console.log(this.getFormValue("codigoMarcaModelo") != "Seleccione")
console.log(this.getFormValue("codigoMarca") != "Seleccione")
console.log(this.getFormValue("anioFabricacion") != "")
console.log(this.getFormValue("codigoDeUso") != "Seleccione")
console.log(this.getFormValue("userEmail") != "")
let actualYear = (new Date()).getFullYear()

this.quotation.nombreMarcaModelo = this.infoautoModelsList.filter((result) => result.codia == this.getFormValue("codigoMarcaModelo"))[0].description;

this.isBrandCompleted = this.getFormValue("codigoMarca") !== "Seleccione"
this.isModelCompleted =this.getFormValue("codigoMarcaModelo") !== "Seleccione"
this.isYearCompleted = this.getFormValue("anioFabricacion") !== ""
this.isYearOk = Number(this.getFormValue("anioFabricacion")) <= actualYear &&  Number(this.getFormValue("anioFabricacion")) >= 1900
this.isUsageCompleted = this.getFormValue("codigoDeUso") !== "Seleccione"
this.isEmailCompleted = this.getFormValue("userEmail") !== ""
return  this.isModelCompleted &&
  this.isBrandCompleted &&
  this.isYearCompleted && 
  this.isYearOk && 
  this.isUsageCompleted &&
  this.isEmailCompleted;
}

getFormValue(field: string) {
return this.VehiclesForm.get(field)!.value;
}

get codigoMarca() {
return this.VehiclesForm.get("codigoMarca");
}

get carAccessory() {
return this.VehiclesForm.get("carAccessory");
}

get anioFabricacion() {
return this.VehiclesForm.get("anioFabricacion");
}

get codigoMarcaModelo() {
return this.VehiclesForm.get("codigoMarcaModelo");
}

get es0Km() {
return this.VehiclesForm.get("es0Km");
}

get tieneAlarma() {
return this.VehiclesForm.get("tieneAlarma");
}

get codigoDeUso() {
return this.VehiclesForm.get("codigoDeUso");
}

get userEmail() {
return this.VehiclesForm.get("userEmail");
}

}
