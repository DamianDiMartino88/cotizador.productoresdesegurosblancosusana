import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Aditional } from 'src/app/Models/Aditional';
import { City } from 'src/app/Models/City';
import { CityResponse } from 'src/app/Models/CityResponse';
import { Province } from 'src/app/Models/Province';
import { ProvinceResponse } from 'src/app/Models/ProvinceResponse';
import { Quotation } from 'src/app/Models/Quotation';
import { VehiclesService } from 'src/app/Services/vehicles.service';

@Component({
  selector: 'app-adress-info',
  templateUrl: './adress-info.component.html',
  styleUrls: ['./adress-info.component.css']
})
export class AdressInfoComponent implements OnInit {

  constructor(private _vehiclesService: VehiclesService,              
    private _formBuilder: FormBuilder,
    private _router: Router) {

}


AdressForm: FormGroup = new FormGroup({})
aditionals: Aditional[] = []
provincesList: Province[] = []
citiesList: City[] = []
quotation: Quotation = new Quotation();
modelListReady:boolean = false;
isFormCompleted: boolean = true;
isProvinceCodeCompleted: boolean = true;
isCityCodeCompleted: boolean = true;
isCelCodeCityCompleted: boolean = true;
isCelNumberCompleted: boolean = true;
isAdressStreetCompleted: boolean = true;
isAdressNumberCompleted: boolean = true;
isPostalCodeCompleted: boolean = true;

ngOnInit(): void {
this.quotation = this._vehiclesService.getQuotation();
if(this.checkInfoCompletion()){
this.formGenerator();
this.getProvinces();
}

}

checkInfoCompletion(): boolean{
if(this.quotation.isVehicleInfoReady && this.quotation.isPersonalInfoReady){
return true
}
else if(!this.quotation.isVehicleInfoReady){
this._router.navigate(['VehicleInfo'], { skipLocationChange: true });
}
else if(!this.quotation.isPersonalInfoReady){
this._router.navigate(['PersonalInfo'], { skipLocationChange: true });
}
return true
}

formGenerator(){
this.AdressForm = this._formBuilder.group({
codigoProvincia: [(this.quotation.codigoProvincia == "")? "Seleccione": this.quotation.codigoProvincia, new FormControl([
Validators.required
])
],
codigoCiudad: [(this.quotation.codigoLocalidad == "")? "Seleccione": this.quotation.codigoLocalidad,new FormControl([
Validators.required
])
],
celularCodArea: [(this.quotation.telefonoDelAsegurado == "")? "": this.quotation.telefonoDelAsegurado,new FormControl([
Validators.required,
Validators.minLength(4)
])
],
celularNumero: ["",new FormControl([
Validators.required
])
],
direccionCalle: ["",new FormControl([
Validators.required
])
],
direccionNumero: ["",new FormControl([
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

getProvinces(){
this.AdressForm.get("codigoProvincia")!.disable();
this.AdressForm.get("codigoCiudad")!.disable();
this._vehiclesService.getProvinces().subscribe((response: ProvinceResponse) =>{
this.provincesList = response.provinciaResponseDtoList;
this.AdressForm.get("codigoProvincia")!.enable();
})
}
getCities(){
var codigoProvincia = this.getFormValue("codigoProvincia");
if(codigoProvincia!="Seleccione"){
//this.carModelsList = this._vehiclesService.getMockCarModelsList(brandid);
this._vehiclesService.getCities(codigoProvincia).subscribe((response: CityResponse)=>{
this.citiesList = response.localidadResponseList;
this.AdressForm.get("codigoCiudad")!.enable();
})
this.quotation.descripcionProvincia = this.provincesList.filter((result) => result.codigoProvincia == codigoProvincia)[0].descripcionProvincia;

console.log(this.quotation.descripcionProvincia)
}else{
this.AdressForm.controls["codigoCiudad"].setValue("Seleccione")
this.AdressForm.get("codigoCiudad")!.disable();
}
}

handleContinue(){
if(this.checkForm()){
this.isFormCompleted = true
this.quotation.codigoProvincia = this.getFormValue("codigoProvincia");
this.quotation.codigoLocalidad = this.getFormValue("codigoCiudad");
this.quotation.telefonoDelAsegurado = this.getFormValue("celularCodArea") + this.getFormValue("celularNumero");
this.quotation.codigoPostal = this.getFormValue("codigoPostal");
this.quotation.isAddressInfoReady = true;

this._vehiclesService.setQuotation(this.quotation);
this._router.navigate(['/ContractInfo'], { skipLocationChange: true });
}
else{
this.isFormCompleted = false
}
}

checkForm(){

// console.log(this.getFormValue("codigoProvincia") != "Seleccione")
// console.log(this.getFormValue("codigoCiudad") != "Seleccione")
// console.log(this.getFormValue("celularCodArea") != "")
// console.log(this.getFormValue("celularNumero") != "")
// console.log(this.getFormValue("codigoPostal") != "")


this.isProvinceCodeCompleted = this.getFormValue("codigoProvincia") !== "Seleccione"
this.isCityCodeCompleted =this.getFormValue("codigoCiudad") !== "Seleccione"
this.isCelCodeCityCompleted = this.getFormValue("celularCodArea") !== ""
this.isCelNumberCompleted = this.getFormValue("celularNumero") !== ""
//this.isAdressStreetCompleted = this.getFormValue("direccionCalle") !== ""
//this.isAdressNumberCompleted = this.getFormValue("direccionNumero") !== ""
this.isPostalCodeCompleted = this.getFormValue("codigoPostal") !== ""

this.quotation.descripcionLocalidad = this.citiesList.filter((result) => result.codigoProvincia == this.getFormValue("codigoLocalidad"))[0].descripcionLocalidad;

return  this.isProvinceCodeCompleted &&
this.isCityCodeCompleted &&
this.isCelCodeCityCompleted && 
this.isCelNumberCompleted && 
this.isAdressStreetCompleted &&
this.isAdressNumberCompleted &&
this.isPostalCodeCompleted;
}

handleBack(){
this._router.navigate(['PersonalInfo'], { skipLocationChange: true });
}

getFormValue(field: string) {
return this.AdressForm.get(field)!.value;
}

get codigoProvincia() {
return this.AdressForm.get("codigoProvincia");
}

get codigoCiudad() {
return this.AdressForm.get("codigoCiudad");
}

get celularCodArea() {
return this.AdressForm.get("celularCodArea");
}

get celularNumero() {
return this.AdressForm.get("celularNumero");
}

// get direccionCalle() {
//   return this.AdressForm.get("direccionCalle");
// }

// get direccionNumero() {
//   return this.AdressForm.get("direccionNumero");
// }

// get direccionPiso() {
//   return this.AdressForm.get("direccionPiso");
// }

// get direccionDepto() {
//   return this.AdressForm.get("direccionDepto");
// }

get codigoPostal() {
return this.AdressForm.get("codigoPostal");
}

}
