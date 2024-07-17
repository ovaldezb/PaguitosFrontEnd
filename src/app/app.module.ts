import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaCreditoComponent } from './components/lista-credito/lista-credito.component';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCreditoComponent } from './components/add-credito/add-credito.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListaCreditoComponent,
    ListaClienteComponent,
    HeaderComponent,
    AddCreditoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
