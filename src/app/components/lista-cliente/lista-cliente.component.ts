import { Component, OnInit } from '@angular/core';
import { faUserPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
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
  faPencil = faPencil;
  clientes:Cliente[] = [];
  cliente:Cliente=new Cliente('','','','','');
  HighlightRow:number=-1;
  isOpenModal:boolean=false;

  getAllClientes(){
    this.clienteService.getAllClientes()
    .subscribe(res=>{
      if(res.status==Global.OK){
        this.clientes = res.body;
      }
    });
  }

  openCloseModal(flag:boolean){
    console.log(flag)
    this.isOpenModal = flag;
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
            this.openCloseModal(false);
            this.getAllClientes();
          }
        });
      }
    })
  }

  clickRow(index:number){
    this.HighlightRow = index;
    this.cliente = this.clientes[index];
  }
}
