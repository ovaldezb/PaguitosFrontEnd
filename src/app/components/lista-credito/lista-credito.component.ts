import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CreditoService } from '../../service/credito.service';
import { Credito } from '../../models/Credito';
import Swal from 'sweetalert2';
import { Global } from '../../service/Global';

@Component({
  selector: 'app-lista-credito',
  templateUrl: './lista-credito.component.html',
  styleUrl: './lista-credito.component.css',
  providers:[CreditoService]
})
export class ListaCreditoComponent implements OnInit{

  constructor(private creditoService:CreditoService){}
  ngOnInit(): void {
    this.getCreditosActivos();
  }
  filtro:string='';
  creditoInit:Credito = {} as Credito;
  faCirclePlus = faCirclePlus;
  faTrash = faTrash;
  public isAddCredito:boolean = false;
  listaCreditos:Credito[]=[];
  tipoBusqueda:boolean=false;
  HighlightRow:number=-1;

  getCreditosActivos(){
    this.creditoService.getCreditosActivos()
      .subscribe(res=>{
        if(res.status==200){
          this.listaCreditos = res.body;
        }
      });
  }

  getAllCreditos(){
    this.creditoService.getAllCreditos()
      .subscribe(res=>{
        if(res.status==200){
          let array = res.body;
          this.listaCreditos = array.sort((a:any,b:any)=>{new Date(a.fechaOpenCredito).getTime() - new Date(b.fechaOpenCredito).getTime() });
        }
      });
  }


  buscaCredito(value:any){
    if(value){
      this.getAllCreditos();
    }else{
      this.getCreditosActivos();
    }
  }

  addCredito(index:number){
    if(index>=0){
      this.creditoInit = this.listaCreditos[index];
    }
    this.isAddCredito = true;
  }

  captaRespuesta(event:any){
    this.creditoInit = {} as Credito;
    if(event.flag==true){
      this.getAllCreditos();
    }
    this.isAddCredito = false;
  }

  ClickedRow(index:number){
    this.HighlightRow = index;
  }

  borraCredito(){
    Swal.fire({
      titleText:'Desea eliminar este crédito?',
      showCancelButton:true,
      confirmButtonText:'Si'
    })
    .then(response=>{
      if(response.isConfirmed){
        this.creditoService.removeCredito(this.listaCreditos[this.HighlightRow].id!)
        .subscribe(res=>{
          if(res.status===Global.OK){
            Swal.fire({
              titleText:"El Crédito se ha eliminado",
              timer:1500
            });
            this.HighlightRow = -1;
            this.getCreditosActivos();
          }
        });
      }
    })
  }

  filtraDatos(){
    var td, found, i, j;
    var tabla = (<HTMLTableElement>document.getElementById('tblCreditos'));
    for (i = 0; i <tabla.rows.length; i++){
        td = tabla.rows[i].cells;
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(this.filtro.toUpperCase()) > -1) {
                found = true;
            }
        }
        if (found) {
            tabla.rows[i].style.display = "";
            found = false;
        } else {
            tabla.rows[i].style.display = "none";
        }
    }
  }
}
