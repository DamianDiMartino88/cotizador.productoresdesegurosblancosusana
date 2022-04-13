import { Franchise } from "./Franchise";
import { Prima } from "./Prima";
import { Taxes } from "./Taxes";

export class OptionQuotation{
    public codigoDeCobertura="";
    public descripcionDeCobertura="";
    public codigoDeProducto="";
    public descripcionDeProducto="";
    public prima: Prima = new Prima();
    public importePremio=0;
    public impuestos: Taxes = new Taxes();
    public sumaAsegurada=0;
    public porcentajeRecargoFinanciero=0;
    public importeRecargoFinanciero=0;
    public requiereInspeccion=true;
    public listaFranquicias: Franchise[] = [];
    public valorComisionPAS=0;
    public porcentajeComisionPAS=0;

}