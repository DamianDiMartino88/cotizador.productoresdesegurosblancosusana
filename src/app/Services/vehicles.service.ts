import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accessory } from '../Models/Accessory';
import { Aditional } from '../Models/Aditional';
import { Brand } from '../Models/Brand';
import { CarModel } from '../Models/CarModel';
import { InfoautoBrand } from '../Models/InfoautoBrand';
import { InfoautoModel } from '../Models/InfoautoModel';
import { InfoautoUsedResponse } from '../Models/InfoAutoUsedResponse';
import { InfoautoZeroKmResponse } from '../Models/InfoAutoZeroKmResponse';
import { OptionQuotation } from '../Models/OptionQuotation';
import { Quotation } from '../Models/Quotation';
import { QuotationRequest } from '../Models/QuotationRequest';
import { QuotationResponse } from '../Models/QuotationResponse';
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
  private usesUrl: string = "uso-vehiculo/";
  private coveragesUrl: string = "coberturas/";
  private accesoriesUrl: string = "accesorios?page=1&page_size=50";
  private aditionals: Aditional[] = []
  private quotation: Quotation = new Quotation();
  private optionQuotation: QuotationResponse = new QuotationResponse();
  private selectedOffer: OptionQuotation = new OptionQuotation();
  private carPrice: number = 0;
  private QuotationResponse: QuotationResponse = new QuotationResponse();
  //private baseApiUrl = "https://bff-cotizadores.herokuapp.com/";
  private baseApiUrl = "https://bff-cotizadores-production.herokuapp.com/";
  private infoautoBrandsList: InfoautoBrand[] = [];
  private infoautoModelsList: InfoautoModel[] = [];

  constructor(private _httpClient: HttpClient) { }

  getBrandsList(page:number):Observable<InfoautoBrand[]>{
    console.log("PAGE: "+page)
    return this._httpClient.get<InfoautoBrand[]>(this.baseApiUrl+this.brandsUrl+"?query_mode=matching&page="+page+"&page_size=100");
  }

  getMockBrandsList():Brand[]{
    return this.brandsList
  }

  getCarModelsList(brandID: number):Observable<InfoautoModel[]>{
    return this._httpClient.get<InfoautoModel[]>(this.baseApiUrl+this.brandsUrl+brandID+"/"+this.modelsUrl+"?price_at=2022&query_mode=matching&page=1&page_size=100");
  }

  getZeroKMPrice(codia:any):Observable<InfoautoZeroKmResponse>{
    return this._httpClient.get<InfoautoZeroKmResponse>(this.baseApiUrl+this.modelsUrl + parseInt(codia) + "/list_price");
  }

  getUsedPrices(codia:any):Observable<InfoautoUsedResponse[]>{
    return this._httpClient.get<InfoautoUsedResponse[]>(this.baseApiUrl+this.modelsUrl + parseInt(codia) + "/prices/");
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

  getCarAccessories():Observable<any>{
    return this._httpClient.get(this.baseApiUrl+this.accesoriesUrl);
    
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

  getUses():Observable<any>{
    return this._httpClient.get(this.baseApiUrl+this.usesUrl);
  }

  getCoverages():Observable<any>{
    return this._httpClient.get(this.baseApiUrl+this.coveragesUrl);
  }

  sendQuotationRequest():Observable<any>{
    return this._httpClient.post(this.baseApiUrl+this.quotationUrl,this.convertQuotation());
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

  setPrice(price:number){
    this.carPrice = price;
    console.log(this.carPrice);
  }

  getOptionQuotation():QuotationResponse{
    return this.optionQuotation
  }

  setOptionQuotation(optionQuotation:QuotationResponse){
    this.optionQuotation = optionQuotation;
  }

  getSelectedOffern():OptionQuotation{
    return this.selectedOffer;
  }

  setSelectedOffer(selectedOffer:OptionQuotation){
    this.selectedOffer = selectedOffer;
  }

  convertQuotation():QuotationRequest{
    var quotationRequest: QuotationRequest = new QuotationRequest();

    quotationRequest.condicionesContratacion.tipoDePoliza = this.quotation.tipoDePoliza;
    quotationRequest.condicionesContratacion.medioDePago = this.quotation.medioDePago;
    quotationRequest.condicionesContratacion.cantidadDeCuotas = this.quotation.cantidadDeCuotas;
    quotationRequest.condicionesContratacion.codigoCondicionIVA = this.quotation.codigoCondicionIVA;
    quotationRequest.condicionesContratacion.codigoCondicionIIBB = this.quotation.codigoCondicionIIBB;
    quotationRequest.condicionesContratacion.tipoDocumentoTomador = this.quotation.tipoDocumentoTomador;
    quotationRequest.condicionesContratacion.numeroDocumentoTomador = this.quotation.numeroDocumentoTomador;
    quotationRequest.condicionesContratacion.clausulaDeAjuste = 0;
    quotationRequest.condicionesContratacion.fechaDesde = this.quotation.fechaDesde;
    quotationRequest.condicionesContratacion.fechaHasta = this.quotation.fechaHasta;
    quotationRequest.condicionesContratacion.fechaNacimientoAsegurado = this.quotation.fechaNacimientoAsegurado;
    quotationRequest.condicionesContratacion.sexoDelAsegurado = this.quotation.sexoDelAsegurado;

    quotationRequest.ubicacionDelRiesgo.codigoPostal = this.quotation.codigoPostal;
    quotationRequest.ubicacionDelRiesgo.codigoProvincia = this.quotation.codigoProvincia;
    quotationRequest.ubicacionDelRiesgo.codigoZonaDeRiesgo = this. quotation.codigoZonaDeRiesgo;

    quotationRequest.vehiculoACotizar.accesoriosVehiculo = this.quotation.accesoriosVehiculoRequest;
    quotationRequest.vehiculoACotizar.anioFabricacion = this.quotation.anioFabricacion;
    quotationRequest.vehiculoACotizar.codigoDeUso = this.quotation.codigoDeUso;
    quotationRequest.vehiculoACotizar.codigoMarcaModelo = this.quotation.codigoMarcaModelo;
    quotationRequest.vehiculoACotizar.codigoTipoAlarma = this.quotation.codigoTipoAlarma;
    quotationRequest.vehiculoACotizar.tieneAlarma = this.quotation.tieneAlarma;
    quotationRequest.vehiculoACotizar.valorVehiculo = this.quotation.valorVehiculo;
    quotationRequest.vehiculoACotizar.zeroKm = this.quotation.es0Km;

    console.log("LIST TO SEND");
    console.log(quotationRequest.vehiculoACotizar.accesoriosVehiculo);

    console.log("QUOTATION REQUEST");
    console.log(quotationRequest);
    return quotationRequest;
  }
}
