import { Equipo } from "./Equipo";
import { Pago } from "./Pagos";
import { Cliente } from "./Cliente"

export class Credito{
  constructor(
    public equipo:Equipo,
    public idCliente:string,
    public cliente:Cliente,
    public noPagosTotales:number,
    public enganche: number,
    public pago:number,
    public pagos:Pago[],
    public plazoPago:string,
    public isPagado:boolean,
    public fechaOpenCredito:Date,
    public adeudo:number,
    public _id?:string,
    public id?:string,
    public nota?:string
  ){}
}