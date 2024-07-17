import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCreditoComponent } from './components/lista-credito/lista-credito.component';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {path: '',component:HeaderComponent},
  {path: 'creditos',component:ListaCreditoComponent},
  {path: 'cliente',component:ListaClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
