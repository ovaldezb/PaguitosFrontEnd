import { Component } from '@angular/core';
import { faUserPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.css'
})
export class ListaClienteComponent {
  faUserPlus = faUserPlus;
  faTrash = faTrash;
}
