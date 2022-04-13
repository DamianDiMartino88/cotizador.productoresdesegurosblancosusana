import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Quotation } from 'src/app/Models/Quotation';
import { VehiclesService } from 'src/app/Services/vehicles.service';

@Component({
  selector: 'app-final-view',
  templateUrl: './final-view.component.html',
  styleUrls: ['./final-view.component.css']
})
export class FinalViewComponent implements OnInit {

  quotation: Quotation = new Quotation();

  constructor(private _vehiclesService: VehiclesService,              
    private _formBuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
  }

  checkInfoCompletion(): boolean{
    if(this.quotation.isVehicleInfoReady && this.quotation.isPersonalInfoReady && this.quotation.isAddressInfoReady && this.quotation.isAcceptanceOfferReady){
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
      else if(!this.quotation.isAcceptanceOfferReady){
        this._router.navigate(['Thanks'], { skipLocationChange: true });
      }
    return true
  }

}
