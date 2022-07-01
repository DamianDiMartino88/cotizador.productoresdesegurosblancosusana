import { Accessory } from "./Accessory";
import { AccessoryRequest } from "./AccessoryRequest";
import { Aditional } from "./Aditional";
import { QuotationResponse } from "./QuotationResponse";

export class Quotation{
    codigoDeProductor: string = "";
    codigoMarca: string = "";
    nombreMarca: string = "";
    codigoMarcaModelo: string = "";
    nombreMarcaModelo: string = "";
    anioFabricacion: number = 0;
    valorVehiculo: number = 0;
    codigoDeUso: string = "";
    es0Km: boolean = false;
    tieneAlarma: boolean = false;
    codigoTipoAlarma: string = "";
    accesoriosVehiculo : Accessory[] = [];
    accesoriosVehiculoRequest : AccessoryRequest[] = [];
    tipoDePoliza: string = "";
    medioDePago: string = "";
    cantidadDeCuotas: number = 1;
    codigoCondicionIVA: string = "";
    codigoCondicionIIBB: string = "2";
    nombresDelAsegurado: string ="";
    apellidosDelAsegurado: string ="";
    tipoDocumentoTomador: string = "D";
    numeroDocumentoTomador: string = "12345678";
    fechaDesde: string|null = "";
    fechaHasta: string|null = "";
    fechaNacimientoAsegurado: string|undefined = "";
    sexoDelAsegurado:string = "";
    adicionalesVehiculo: Aditional[] = [];
    direccionDelAsegurado: string = "";
    codigoPostal: string = "";
    codigoProvincia: string = "";
    descripcionProvincia: string = "";
    codigoLocalidad: string = "";
    descripcionLocalidad: string = "";
    codigoZonaDeRiesgo: string = "";
    telefonoDelAsegurado: string = "";
    userEmail: string = "";
    quotationResponse: QuotationResponse = new QuotationResponse();
    isVehicleInfoReady: boolean = true;
    isAddressInfoReady: boolean = true;
    isPersonalInfoReady: boolean = true;
    isContractInfoReady: boolean = true;
    isAcceptanceOfferReady: boolean = true;
}