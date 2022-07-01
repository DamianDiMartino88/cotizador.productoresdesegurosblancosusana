import { ContractingConditions } from "./ContractingConditions";
import { RiskLocation } from "./RiskLocation";
import { VehicleToQuote } from "./VehicleToQuote";

export class QuotationRequest{
    public codigoDeProductor: string = "";
    public condicionesContratacion: ContractingConditions = new ContractingConditions();
    public ubicacionDelRiesgo: RiskLocation = new RiskLocation();
    public vehiculoACotizar: VehicleToQuote= new VehicleToQuote();
}