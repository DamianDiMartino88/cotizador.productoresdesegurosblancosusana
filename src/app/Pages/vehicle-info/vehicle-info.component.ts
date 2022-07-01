import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accessory } from 'src/app/Models/Accessory';
import { AccessoryRequest } from 'src/app/Models/AccessoryRequest';
import { AccessoryResponse } from 'src/app/Models/AccessoryResponse';
import { Brand } from 'src/app/Models/Brand';
import { CarModel } from 'src/app/Models/CarModel';
import { Coverage } from 'src/app/Models/Coverage';
import { CoverageResponse } from 'src/app/Models/CoverageResponse';
import { Email } from 'src/app/Models/Email';
import { InfoautoBrand } from 'src/app/Models/InfoautoBrand';
import { InfoautoModel } from 'src/app/Models/InfoautoModel';
import { InfoautoUsedResponse } from 'src/app/Models/InfoAutoUsedResponse';
import { InfoautoZeroKmResponse } from 'src/app/Models/InfoAutoZeroKmResponse';
import { Quotation } from 'src/app/Models/Quotation';
import { Use } from 'src/app/Models/Use';
import { UseResponse } from 'src/app/Models/UseResponse';
import { MailingService } from 'src/app/Services/mailing.service';
import { VehiclesService } from 'src/app/Services/vehicles.service';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css'],
  providers: [DatePipe]
})
export class VehicleInfoComponent implements OnInit {

  constructor(private _vehiclesService: VehiclesService,
    private _mailingService: MailingService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _datePipe: DatePipe) {
  }

  brandsList: Brand[] = [];
  infoautoBrandsList: InfoautoBrand[] = [];
  infoautoSupportBrandsList: InfoautoBrand[] = [];
  infoautoModelsList: InfoautoModel[] = [];
  carModelsList: CarModel[] = [];
  coveragesList: Coverage[] = [];
  accessoriesList: Accessory[] = [];
  usesList: Use[] = [];
  selectedAccessories: Accessory[] = [];
  selectedAccessoriesRequest: AccessoryRequest[] = [];

  quotation: Quotation = new Quotation();
  email: Email = new Email();
  VehiclesForm: FormGroup = new FormGroup({});
  isFormCompleted: boolean = true;
  isBrandCompleted: boolean = true;
  isModelCompleted: boolean = true;
  isYearCompleted: boolean = true;
  isYearOk: boolean = true;
  isUsageCompleted: boolean = true;
  isEmailCompleted: boolean = true;
  isAccesoriesListFull: boolean = false;


  ngOnInit(): void {

    this.quotation = this._vehiclesService.getQuotation();
    this.selectedAccessories = this.quotation.accesoriosVehiculo;
    this.formGenerator()
    this.getBrands(1);
    this._vehiclesService.getCarAccessories().subscribe((response: AccessoryResponse) => {
      this.accessoriesList = response.accesorioResponseDtoList;
    })
    this._vehiclesService.getUses().subscribe((response: UseResponse) => {
      this.usesList = response.usoVehiculoResponseList;
    })

    this._vehiclesService.getCoverages().subscribe((response: CoverageResponse) => {
      this.coveragesList = response.coberturaResponseDtoList;
    })
  }

  formGenerator() {
    this.VehiclesForm = this._formBuilder.group({
      codigoMarca: [(this.quotation.codigoMarca == "") ? "Seleccione" : this.quotation.codigoMarca, new FormControl([
        Validators.required,
        Validators.minLength(2)
      ])
      ],
      carAccessory: ["Seleccione", new FormControl([
        Validators.required
      ])
      ],
      anioFabricacion: [(this.quotation.anioFabricacion == 0) ? "" : this.quotation.anioFabricacion, new FormControl([
        Validators.required,
        Validators.minLength(4)
      ])
      ],
      codigoMarcaModelo: [(this.quotation.codigoMarcaModelo == "") ? "Seleccione Marca y Año" : this.quotation.codigoMarcaModelo, new FormControl([
        Validators.required
      ])
      ],
      userEmail: [(this.quotation.userEmail == "") ? "" : this.quotation.userEmail, new FormControl([
        Validators.required,
        Validators.email
      ])
      ],
      es0Km: [false],
      tieneAlarma: [false],
      codigoDeUso: [(this.quotation.codigoDeUso == "") ? "Seleccione" : this.quotation.codigoDeUso, new FormControl([
        Validators.required
      ])
      ]
    })
  }

  getBrands(page:number) {
    this.VehiclesForm.get("codigoMarca")!.disable();
    this.VehiclesForm.get("codigoMarcaModelo")!.disable();

    this._vehiclesService.getBrandsList(page).subscribe((response) => {
      this.infoautoBrandsList = response;

      this._vehiclesService.getBrandsList(2).subscribe((response) => {
        this.infoautoSupportBrandsList = [];
        this.infoautoSupportBrandsList = response;
        this.infoautoBrandsList.concat(this.infoautoSupportBrandsList);

        this.infoautoSupportBrandsList.forEach((infoAutoElement) =>{
          this.infoautoBrandsList.push(infoAutoElement);
        })
      })
      this.VehiclesForm.get("codigoMarca")!.enable();
    }
    );
  }

  getCarModels() {

    // this._vehiclesService.getBrandsList().subscribe((data: Brand[])=>{
    //   this.brandsList = data;
    // })
    var brandid = this.getFormValue("codigoMarca");
    var yearLength = (this.getFormValue("anioFabricacion") == null) ? 0 : this.getFormValue("anioFabricacion").toString().length;
    if (brandid != "Seleccione" && yearLength == 4) {


      this._vehiclesService.getCarModelsList(brandid).subscribe((data: InfoautoModel[]) => {
        this.infoautoModelsList = data;
        this.VehiclesForm.get("codigoMarcaModelo")!.enable();

      })
      this.quotation.nombreMarca = this.infoautoBrandsList.filter((result) => result.id == brandid)[0].name;

    } else {
      this.VehiclesForm.controls["codigoMarcaModelo"].setValue("Seleccione Marca y Año")
      this.VehiclesForm.get("codigoMarcaModelo")!.disable();
    }
  }

  getAccessories() {
    //this.accessoriesList = this._vehiclesService.getCarAccessories();
    console.log("Accesories List");
    console.log(this._vehiclesService.getCarAccessories());
    console.log("Uses List");
    console.log(this._vehiclesService.getUses());
    console.log("Offers List");
    console.log(this._vehiclesService.getCoverages());
  }

  getUses() {
    this.usesList = this._vehiclesService.getMockUsesModelsList();
  }

  addAccessory() {
    var newAccessory = this.getFormValue("carAccessory");
    if (newAccessory != "Seleccione") {
      var array1 = [this.selectedAccessories.find(accessory => accessory.codigoAccesorio == newAccessory)]
      if (array1[0] == undefined) {
        var filteredAccessory = this.accessoriesList.filter(accessory => accessory.codigoAccesorio == newAccessory)[0]
        var accessoryToAdd: AccessoryRequest = new AccessoryRequest();
        accessoryToAdd.codigoAccesorio = filteredAccessory.codigoAccesorio;
        accessoryToAdd.sumaAccesorio = filteredAccessory.sumaAccesorio;
        this.selectedAccessoriesRequest.push(accessoryToAdd);
        this.selectedAccessories.push(this.accessoriesList.filter(accessory => accessory.codigoAccesorio == newAccessory)[0])
      }
      this.VehiclesForm.controls["carAccessory"].setValue("Seleccione")
    }
    this.isAccesoriesListFull = this.selectedAccessories.length > 0 ? true : false;
  }

  deleteAccessory(selected: Accessory) {
    this.selectedAccessories = this.selectedAccessories.filter(accessory => accessory.codigoAccesorio != selected.codigoAccesorio)
    this.selectedAccessoriesRequest = this.selectedAccessoriesRequest.filter(accessory => accessory.codigoAccesorio != selected.codigoAccesorio)
    this.isAccesoriesListFull = this.selectedAccessories.length > 0 ? true : false;
  }

  checkValidation() {

  }
  handleContinue() {
    //Mail Sender
    if (this.checkForm()) {
      this.isFormCompleted = true
      this.quotation.codigoMarca = this.getFormValue("codigoMarca");
      this.quotation.codigoMarcaModelo = this.getFormValue("codigoMarcaModelo");
      this.quotation.anioFabricacion = this.getFormValue("anioFabricacion");
      this.quotation.codigoDeUso = this.getFormValue("codigoDeUso");
      this.quotation.es0Km = this.getFormValue("es0Km");
      this.setPrice();
      //this.quotation.valorVehiculo = (this.quotation.es0Km) ? this.set0KmPrice(parseInt(this.quotation.codigoMarcaModelo)) : this.setUsedPrice(this.quotation.anioFabricacion,parseInt(this.quotation.codigoMarcaModelo)); // recibir valor de infoauto
      this.quotation.tieneAlarma = this.getFormValue("tieneAlarma");
      this.quotation.userEmail = this.getFormValue("userEmail");
      this.quotation.accesoriosVehiculoRequest = this.selectedAccessoriesRequest;
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
      //this._mailingService.mailSender(this.email);

      this._router.navigate(['/PersonalInfo'], { skipLocationChange: true });
    }
    else {
      this.isFormCompleted = false
    }
  }


  setPrice() {
    if (this.quotation.es0Km) {
      this.set0KmPrice(parseInt(this.quotation.codigoMarcaModelo));
    }
    else {
      this.setUsedPrice(this.quotation.anioFabricacion, parseInt(this.quotation.codigoMarcaModelo));
    }
  }

  set0KmPrice(codia: number) {
    var carPrice: InfoautoZeroKmResponse = new InfoautoZeroKmResponse()
    this._vehiclesService.getZeroKMPrice(codia).subscribe((response: InfoautoZeroKmResponse) => {
      carPrice.list_price = response.list_price;
      this.quotation.valorVehiculo = carPrice.list_price;
    })

  }

  setUsedPrice(anioFabricacion: number, codia: number) {
    var usedCarsList: InfoautoUsedResponse[] = []
    var searchedUsed: number = 0;
    this._vehiclesService.getUsedPrices(codia).subscribe((response: InfoautoUsedResponse[]) => {
      usedCarsList = response;
      searchedUsed = usedCarsList.filter((result) => result.year == anioFabricacion)[0].price
      this.quotation.valorVehiculo = searchedUsed;
    })
  }

  checkForm() {
    let actualYear = (new Date()).getFullYear()

    this.quotation.nombreMarcaModelo = this.infoautoModelsList.filter((result) => result.codia == this.getFormValue("codigoMarcaModelo"))[0].description;

    this.isBrandCompleted = this.getFormValue("codigoMarca") !== "Seleccione"
    this.isModelCompleted = this.getFormValue("codigoMarcaModelo") !== "Seleccione"
    this.isYearCompleted = this.getFormValue("anioFabricacion") !== ""
    this.isYearOk = Number(this.getFormValue("anioFabricacion")) <= actualYear && Number(this.getFormValue("anioFabricacion")) >= 1900
    this.isUsageCompleted = this.getFormValue("codigoDeUso") !== "Seleccione"
    this.isEmailCompleted = this.getFormValue("userEmail") !== ""
    return this.isModelCompleted &&
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
