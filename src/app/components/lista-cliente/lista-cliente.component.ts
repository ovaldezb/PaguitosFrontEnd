import { Component, OnInit } from '@angular/core';
import { faUserPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../service/cliente.service';
import { Global } from '../../service/Global';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.css',
  providers:[ClienteService, UsuarioService]
})
export class ListaClienteComponent implements OnInit {
  
  constructor(private clienteService:ClienteService,
    private usuarioService: UsuarioService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.usuarioService.getUserName()
    .subscribe(res=>{
      if(res.status===Global.OK && res.body.userName===Global.USER){
        this.getAllClientes();
      }else{
        this.router.navigate(['refused']);
      }
    })
   
  }
  faUserPlus = faUserPlus;
  faTrash = faTrash;
  clientes:Cliente[] = [];
  cliente:Cliente=new Cliente('','','','','',true);
  HighlightRow:number=-1;
  isOpenModal:boolean=false;
  actionBtn:string=Global.AGREGAR;
  txtAction:string='Agregar';

  getAllClientes(){
    this.clienteService.getAllClientes()
    .subscribe(res=>{
      if(res.status==Global.OK){
        this.clientes = res.body;
      }
    });
  }

  openCloseModal(flag:boolean, action:string){
    if(action===Global.AGREGAR){
      this.cliente = new Cliente('','','','','',true);
      this.actionBtn = Global.AGREGAR;
      this.txtAction = 'Agregar';
    }else{
      this.txtAction = 'Actualizar';
      this.actionBtn = Global.ACTUALIZAR;
    }
    
    this.isOpenModal = flag;
  }

  agregarActualizar(){
    if(this.actionBtn===Global.AGREGAR){
      this.addCliente();
    }else{
      this.actualizarCliente();
    }
  }

  borraCliente(){
    Swal.fire({
      titleText:'Desea eliminar este cliente?',
      showCancelButton:true,
      confirmButtonText:'Si'
    })
    .then(response=>{
      if(response.isConfirmed){
        this.clienteService.deleteCliente(this.cliente.id!)
        .subscribe(res=>{
          if(res.status===Global.OK){
            Swal.fire({
              titleText:'El cliente se ha eliminado',
              timer:1500
            });
            this.HighlightRow = -1;
            this.getAllClientes();
          }
        })
      }
    });
  }

  addCliente(){
    Swal.fire({
      titleText:'Desea agregar éste cliente?',
      showCancelButton: true,
      confirmButtonText:'Si'
    })
    .then(response=>{
      if(response.isConfirmed){
        this.clienteService.addCliente(this.cliente)
        .subscribe(res=>{
          if(res.status === Global.OK){
            this.limpiar();
            Swal.fire({
              titleText:'El cliente se ha agregado!',
              timer:1500
            });
            this.HighlightRow = -1;
            this.openCloseModal(false, Global.AGREGAR);
            this.getAllClientes();
            this.limpiar();
          }
        });
      }
    });
  }

  actualizarCliente(){
    Swal.fire({
      titleText:'Desea realizar estos cambios?',
      showCancelButton:true,
      confirmButtonText:"Si"
    })
    .then(response=>{
      if(response.isConfirmed){
        this.clienteService.updateCliente(this.cliente.id!,this.cliente)
        .subscribe(res=>{
          if(res.status===Global.OK){
            Swal.fire({
              titleText:'El cliente se ha actualizado',
              timer:1500
            });
            this.HighlightRow = -1;
            this.openCloseModal(false, Global.AGREGAR);
            this.getAllClientes();
            this.limpiar();
          }
        });
      }
    })
  }

  clickRow(index:number){
    this.HighlightRow = index;
    this.cliente = this.clientes[index];
  }

limpiar(){
  this.cliente=new Cliente('','','','','',true);
}
}
