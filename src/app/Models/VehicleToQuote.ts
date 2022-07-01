import { Accessory } from "./Accessory";
import { AccessoryRequest } from "./AccessoryRequest";

export class VehicleToQuote{
    codigoMarcaModelo: string = "";
    anioFabricacion: number = 0;
    valorVehiculo: number = 0;
    codigoDeUso: string = "";
    zeroKm: boolean = false;
    tieneAlarma: boolean = false;
    codigoTipoAlarma: string = "";
    accesoriosVehiculo : AccessoryRequest[] = [];
}