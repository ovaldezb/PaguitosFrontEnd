import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { Credito } from '../../models/Credito';
import { Equipo } from '../../models/Equipo';
import { Pago } from '../../models/Pagos';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ClienteService } from '../../service/cliente.service';
import { CreditoService } from '../../service/credito.service';
import Swal from 'sweetalert2';
import { Global } from '../../service/Global';

@Component({
  selector: 'app-add-credito',
  templateUrl: './add-credito.component.html',
  styleUrl: './add-credito.component.css',
  providers:[ClienteService, CreditoService]
})
export class AddCreditoComponent implements OnInit{

constructor(private clienteService:ClienteService, private creditoService:CreditoService){}
  

  @Input() creditoInit:Credito= {} as Credito;
  @Output() respuesta = new EventEmitter();
  public cliente:Cliente= new Cliente('','','','','');
  public credito:Credito= new Credito(new Equipo('','','',0),'',new Cliente('','','','',''),0,0,0,[],'quincenal',false, new Date(),'');
  public pago:Pago= new Pago(new Date(),0);
  pagos:Pago[]=[];
  montoPago:number=0;
  pendientePago:number=0;
  faCirclePlus = faCirclePlus;
  isNuevo:boolean = true;
  pagosDe:number=0;
  isBuscar:boolean=false;
  ngOnInit(): void {
    
    if(this.creditoInit.idCliente!=undefined){
      this.isNuevo = false;
      this.credito = this.creditoInit;
      this.cliente = this.creditoInit.cliente;
      this.pendientePago = this.credito.equipo.costo - this.credito.enganche - this.credito.pagos.reduce((a,pago)=>a+pago.montoPago,0);
      this.pagos = this.credito.pagos;
    }
  }

  addPago(){
    Swal.fire({
        titleText:'Desea agregar éste pago?',
        showCancelButton:true,
        confirmButtonText:'Si'
      })
      .then(response=>{
        if(response.isConfirmed){
          let totalPagado = this.credito.equipo.costo - this.credito.enganche - this.credito.pagos.reduce((a,pago)=>a+pago.montoPago,0) - this.credito.pago;
          let isPagado = totalPagado <= 0 ? 'true' : 'false';
          this.pago = new Pago(new Date(),this.credito.pago);
          this.creditoService.addPago(this.pago,this.credito.id!, isPagado)
            .subscribe(res=>{
              if(res.status==Global.OK){
                this.pagos = res.body.pagos;
                this.pendientePago = this.credito.equipo.costo - this.credito.enganche - this.pagos.reduce((a,pago)=>a+pago.montoPago,0);
                this.isBuscar = true;
                Swal.fire({
                  text:'Se ha acreditado el pago',
                  timer:1500
                })
              }
            });
        }
      });
  }

  calculaMontoPagos(){
   if(this.credito.equipo.costo != 0){
    this.pendientePago = this.credito.equipo.costo - this.credito.enganche;
    this.credito.pago = this.pendientePago / this.credito.noPagosTotales;
   } 
  }

  cancelaAltaCredito(){
    this.credito = new Credito(new Equipo('','','',0),'',new Cliente('','','','',''),0,0,0,[],'quincenal',false, new Date(),'');
    this.respuesta.emit({flag:this.isBuscar});
  }

  agregaEditaCredito(){
    Swal.fire({
      title:'Deseas agregar éste crédito?',
      showCancelButton:true,
      confirmButtonText:'Si'
    })
    .then(resultado=>{
      if(resultado.isConfirmed){
        this.credito.fechaOpenCredito = new Date();
        this.clienteService
          .addCliente(this.cliente)
          .subscribe(res1=>{
            if(res1.status==Global.OK){
              this.credito.idCliente = res1.body.id;
              delete this.credito["_id"];
              this.creditoService.addCredito(this.credito)
              .subscribe(res2=>{
                if(res2.status==Global.OK){
                  Swal.fire({
                    text:'Se guardo el crédito',
                    timer:1500
                  });
                  this.respuesta.emit({flag:true});
                }
              });
            }
          });
      }
    });
  }
}
