import { Accessory } from "./Accessory";
import { Aditional } from "./Aditional";

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
    tipoDePoliza: string = "";
    medioDePago: string = "";
    cantidadDeCuotas: number = 1;
    codigoCondicionIVA: string = "";
    codigoCondicionIIBB: string = "";
    nombresDelAsegurado: string ="";
    apellidosDelAsegurado: string ="";
    tipoDocumentoTomador: string = "";
    numeroDocumentoTomador: string = "";
    fechaNacimientoAsegurado: string = "";
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
    isVehicleInfoReady: boolean = true;
    isAddressInfoReady: boolean = true;
    isPersonalInfoReady: boolean = true;
    isContractInfoReady: boolean = true;
    isAcceptanceOfferReady: boolean = true;
}