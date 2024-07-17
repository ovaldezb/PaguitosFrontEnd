import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credito } from '../models/Credito';
import { Pago } from '../models/Pagos';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  constructor(private _http:HttpClient) { }

  getAllCreditos():Observable<any>{
    return this._http.get(Global.urlCredito+'/todos',{observe:'response'});
  }

  getCreditosActivos():Observable<any>{
    return this._http.get(Global.urlCredito,{observe:'response'});
  }

  addCredito(credito:Credito):Observable<any>{
    return this._http.post(Global.urlCredito,credito,{observe:'response'});
  }

  addPago(pago:Pago, idCredito:string, isPagado:string):Observable<any>{
    return this._http.put(Global.urlCredito+'/'+idCredito+'/'+isPagado,pago,{observe:'response'});
  }

  removeCredito(idCredito:string):Observable<any>{
    return this._http.delete(Global.urlCredito+'/'+idCredito,{observe:'response'});
  }
}
