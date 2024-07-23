import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private _http:HttpClient) { }

  addCliente(cliente:Cliente):Observable<any>{
    return this._http.post(Global.backEndServer+Global.urlCliente,cliente,{observe:'response'});
  }

  getAllClientes():Observable<any>{
    return this._http.get(Global.backEndServer+Global.urlCliente,{observe:'response'});
  }

  getClientesByNombre(nombre:string):Observable<any>{
    return this._http.get(Global.backEndServer+Global.urlCliente+'/'+nombre,{observe:'response'});
  }

  updateCliente(idCliente:string, cliente:Cliente ):Observable<any>{
    return this._http.put(Global.backEndServer+Global.urlCliente+'/'+idCliente,cliente,{observe:'response'});
  }

  deleteCliente(idCliente:string):Observable<any>{
    return this._http.delete(Global.backEndServer+Global.urlCliente+'/'+idCliente,{observe:'response'});
  }
}
