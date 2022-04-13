import { OptionQuotation } from 'src/app/Models/OptionQuotation';

export class QuotationResponse{
    public numeroDeCotizacion=0;
    public cotizaciones: OptionQuotation[] = [];
}