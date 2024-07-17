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
    return this._http.post(Global.urlCliente,cliente,{observe:'response'});
  }

  getAllClientes():Observable<any>{
    return this._http.get(Global.urlCliente,{observe:'response'});
  }

  updateCliente(idCliente:string, cliente:Cliente ):Observable<any>{
    return this._http.put(Global.urlCliente+'/'+idCliente,cliente,{observe:'response'});
  }

  deleteCliente(idCliente:string):Observable<any>{
    return this._http.delete(Global.urlCliente+'/'+idCliente,{observe:'response'});
  }
}
