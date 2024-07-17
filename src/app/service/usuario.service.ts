import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _http:HttpClient) { }

  getUserName():Observable<any>{
    return this._http.get(Global.urlUsuario,{observe:'response'});
  }
}
