import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accessory } from '../Models/Accessory';
import { Aditional } from '../Models/Aditional';
import { Brand } from '../Models/Brand';
import { CarModel } from '../Models/CarModel';
import { InfoautoBrand } from '../Models/InfoautoBrand';
import { InfoautoModel } from '../Models/InfoautoModel';
import { OptionQuotation } from '../Models/OptionQuotation';
import { Quotation } from '../Models/Quotation';
import { Use } from '../Models/Use';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private brandsList: Brand[] = [];
  private carModelsList: CarModel[] = [];
  private usesList: Use[] = [];
  private brandsUrl: string = "brands/";
  private modelsUrl: string = "models/";
  private quotationUrl: string = "cotizar/";
  private provincesUrl: string = "provincias/";
  private citiesUrl: string = "localidades/";
  private aditionals: Aditional[] = []
  private quotation: Quotation = new Quotation();
  private optionQuotation: OptionQuotation = new OptionQuotation();
  private baseApiUrl = "https://bff-cotizadores-production.herokuapp.com/";
  private infoautoBrandsList: InfoautoBrand[] = [];
  private infoautoModelsList: InfoautoModel[] = [];

  constructor(private _httpClient: HttpClient) { }

  getBrandsList():Observable<InfoautoBrand[]>{
    return this._httpClient.get<InfoautoBrand[]>(this.baseApiUrl+this.brandsUrl);
  }

  getMockBrandsList():Brand[]{
    return this.brandsList
  }

  getCarModelsList(brandID: number):Observable<InfoautoModel[]>{
    return this._httpClient.get<InfoautoModel[]>(this.baseApiUrl+this.brandsUrl+brandID+"/"+this.modelsUrl);
  }

  getMockCarModelsList(brandID: number):CarModel[]{

    return this.carModelsList.filter(model => model.BrandID == brandID)
  }

  getMockUsesModelsList():Use[]{
    return [
      {
          codigoDeUso:1,
          tipoDeUso:"Particular"
      },
      {
          codigoDeUso:2,
          tipoDeUso:"Comercial"
      }
    ]
  }

  getCarAccessories():Accessory[]{
    return [
      {AccessoryID:3, AccessoryDescription:"STEREO"},
      {AccessoryID:8, AccessoryDescription:"FAROS DE IODO"},
      {AccessoryID:9, AccessoryDescription:"A.ACONDICIONADO"},
      {AccessoryID:10, AccessoryDescription:"LLANTAS ESPEC."},
      {AccessoryID:14, AccessoryDescription:"CUBIERTAS ESP."},
      {AccessoryID:16, AccessoryDescription:"V.POLAR/ANTIVAN"},
      {AccessoryID:18, AccessoryDescription:"CUPULA"},
      {AccessoryID:99, AccessoryDescription:"OTROS"},
      {AccessoryID:20, AccessoryDescription:"EQUIPO G.N.C"},
      {AccessoryID:21, AccessoryDescription:"EQUIPO DE FRIO"},
      {AccessoryID:22, AccessoryDescription:"CAJA TERMICA"},
      {AccessoryID:26, AccessoryDescription:"FURGON"},
      {AccessoryID:27, AccessoryDescription:"LEV.VIDRIOS ELE"},
      {AccessoryID:28, AccessoryDescription:"SPOILER"},
      {AccessoryID:29, AccessoryDescription:"ALERON"},
      {AccessoryID:30, AccessoryDescription:"CIERRE CENTRALI"},
      {AccessoryID:78, AccessoryDescription:"PACK"},
      {AccessoryID:31, AccessoryDescription:"CONSOLA MULTI"},
      {AccessoryID:32, AccessoryDescription:"BLINDAJE"},
    ]
  }

  getAditionals():Aditional[]{
    return [
      {
          aditionalID:"001",
          aditionalDescription:"Granizo"
      }// ,
      // {
      //     aditionalID:"010-B1",
      //     aditionalDescription:"Cargas Peligrosas"
      // },
      // {
      //     aditionalID:"011",
      //     aditionalDescription:"Campos Petrolíferos"
      // }
    ]
  }

  sendQuotationRequest():Observable<any>{
    return this._httpClient.post(this.baseApiUrl+this.quotationUrl,this.quotation);
  }

  getProvinces():Observable<any>{
    return this._httpClient.get(this.baseApiUrl+this.provincesUrl);
  }

  getCities(codigoProvincia:any):Observable<any>{
    return this._httpClient.get(this.baseApiUrl+this.citiesUrl,codigoProvincia);
  }

  getQuotation():Quotation{
    return this.quotation
  }

  setQuotation(quotation:Quotation){
    this.quotation = quotation;
  }

  getOptionQuotation():OptionQuotation{
    return this.optionQuotation
  }

  setOptionQuotation(optionQuotation:OptionQuotation){
    this.optionQuotation = optionQuotation;
  }
}
