import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accessory } from 'src/app/Models/Accessory';
import { Brand } from 'src/app/Models/Brand';
import { CarModel } from 'src/app/Models/CarModel';
import { Quotation } from 'src/app/Models/Quotation';
import { VehiclesService } from 'src/app/Services/vehicles.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private _vehiclesService: VehiclesService,              
    private _formBuilder: FormBuilder,
    private _router: Router) {

}

brandsList :Brand[] = [];
carModelsList :CarModel[] = [];
accessoriesList: Accessory[] = [];
selectedAccessories: Accessory[] = [];
quotation: Quotation = new Quotation();
isFormCompleted:boolean = true;
isNameCompleted : boolean = true;
isLastNameCompleted : boolean = true;
isDocumentTypeCompleted : boolean = true;
isDocumentCompleted : boolean = true;
isEmailCompleted : boolean = true;
isGenreCompleted : boolean = true;
isBornDateCompleted : boolean = true;

UserForm: FormGroup = new FormGroup({});

ngOnInit(): void {

this.quotation = this._vehiclesService.getQuotation();
if(this.checkInfoCompletion()){
this.formGenerator();
}
else{
this._router.navigate(['VehicleInfo'], { skipLocationChange: true });
}
}

checkInfoCompletion(): boolean{
if(this.quotation.isVehicleInfoReady){
return true
}
else{
this._router.navigate(['VehicleInfo']);
}

return true
}

formGenerator(){
this.UserForm = this._formBuilder.group({
nombresDelAsegurado: [(this.quotation.nombresDelAsegurado == "")? "": this.quotation.nombresDelAsegurado, new FormControl([
Validators.required,
Validators.minLength(2)
])
],
apellidosDelAsegurado: [(this.quotation.apellidosDelAsegurado == "")? "": this.quotation.apellidosDelAsegurado,new FormControl([
Validators.required
])
],
numeroDocumentoTomador: [(this.quotation.numeroDocumentoTomador == "")? "": this.quotation.numeroDocumentoTomador,new FormControl([
Validators.required,
Validators.minLength(4)
])
],
userEmail: [(this.quotation.userEmail == "")? "": this.quotation.userEmail,new FormControl([
Validators.required
])
],
sexoDelAsegurado: [(this.quotation.sexoDelAsegurado == "")? "Seleccione": this.quotation.sexoDelAsegurado,new FormControl([
Validators.required
])
],
tipoDocumentoTomador: [(this.quotation.tipoDocumentoTomador == "")? "Seleccione": this.quotation.tipoDocumentoTomador,new FormControl([
Validators.required
])
],
fechaNacimientoAsegurado: [(this.quotation.fechaNacimientoAsegurado == "")? "": this.quotation.fechaNacimientoAsegurado,new FormControl([
Validators.required
])
]
})
}

getBrands(){
// this._vehiclesService.getBrandsList().subscribe((data: Brand[])=>{
//   this.brandsList = data;
// })

this.brandsList = this._vehiclesService.getMockBrandsList();
}

getCarModels(){

// this._vehiclesService.getBrandsList().subscribe((data: Brand[])=>{
//   this.brandsList = data;
// })
var brandid = this.getFormValue("brand");
console.log(brandid)
this.carModelsList = this._vehiclesService.getMockCarModelsList(this.getFormValue("brand"));
}

getAccessories(){
this.accessoriesList = this._vehiclesService.getCarAccessories();
}

addAccessory(){
var newAccessory = this.getFormValue("carAccessory");
if(newAccessory !="Seleccione"){
var array1 = [this.selectedAccessories.find(accessory => accessory.AccessoryID == newAccessory)]
if(array1[0] == undefined){
this.selectedAccessories.push(this.accessoriesList.filter(accessory => accessory.AccessoryID == newAccessory)[0])
}
this.UserForm.controls["carAccessory"].setValue("Seleccione")
}
}

deleteAccessory(selected: Accessory){
console.log("Deleting "+selected.AccessoryID)
this.selectedAccessories=this.selectedAccessories.filter(accessory => accessory.AccessoryID != selected.AccessoryID)
}

handleContinue(){
if(this.checkForm()){
this.isFormCompleted = true
//this.quotation.tipoDocumentoTomador = this.getFormValue("tipoDocumentoTomador");
this.quotation.nombresDelAsegurado = this.getFormValue("nombresDelAsegurado");
this.quotation.apellidosDelAsegurado = this.getFormValue("apellidosDelAsegurado");
//this.quotation.numeroDocumentoTomador = this.getFormValue("numeroDocumentoTomador");
this.quotation.fechaNacimientoAsegurado = this.getFormValue("fechaNacimientoAsegurado");
this.quotation.sexoDelAsegurado = this.getFormValue("sexoDelAsegurado");

this.quotation.isPersonalInfoReady = true;
this._vehiclesService.setQuotation(this.quotation);

this._vehiclesService.setQuotation(this.quotation);
this._router.navigate(['/AdressInfo'], { skipLocationChange: true });
}
else{
this.isFormCompleted = false
}
}

checkForm(){
console.log(this.getFormValue("nombresDelAsegurado") != "")
console.log(this.getFormValue("apellidosDelAsegurado") != "")
//console.log(this.getFormValue("tipoDocumentoTomador") != "Seleccione")
//console.log(this.getFormValue("numeroDocumentoTomador") != "")
console.log(this.getFormValue("fechaNacimientoAsegurado") != "")
console.log(this.getFormValue("sexoDelAsegurado") != "Seleccione")
console.log(this.getFormValue("userEmail") != "")


this.isNameCompleted = this.getFormValue("nombresDelAsegurado") !== ""
this.isLastNameCompleted =this.getFormValue("apellidosDelAsegurado") !== ""
//this.isDocumentTypeCompleted = this.getFormValue("tipoDocumentoTomador") !== "Seleccione"
//this.isDocumentCompleted = this.getFormValue("numeroDocumentoTomador") !== ""
this.isBornDateCompleted = this.getFormValue("fechaNacimientoAsegurado") !== ""
this.isGenreCompleted = this.getFormValue("sexoDelAsegurado") !== "Seleccione"
this.isEmailCompleted = this.getFormValue("userEmail") !== ""
return  this.isNameCompleted &&
this.isLastNameCompleted &&
//this.isDocumentTypeCompleted && 
this.isBornDateCompleted && 
this.isGenreCompleted &&
this.isEmailCompleted;
}

handleBack(){
this._router.navigate(['/VehicleInfo'], { skipLocationChange: true });
}

getFormValue(field: string) {
return this.UserForm.get(field)!.value;
}

get nombresDelAsegurado() {
return this.UserForm.get("nombresDelAsegurado");
}

get apellidosDelAsegurado() {
return this.UserForm.get("apellidosDelAsegurado");
}

// get numeroDocumentoTomador() {
//   return this.UserForm.get("numeroDocumentoTomador");
// }

// get tipoDocumentoTomador() {
//   return this.UserForm.get("tipoDocumentoTomador");
// }

get fechaNacimientoAsegurado() {
return this.UserForm.get("fechaNacimientoAsegurado");
}

get sexoDelAsegurado() {
return this.UserForm.get("sexoDelAsegurado");
}

get userEmail() {
return this.UserForm.get("userEmail");
}



TestFunctionality(){
console.log(this.getFormValue("fechaNacimientoAsegurado"))
}


}
