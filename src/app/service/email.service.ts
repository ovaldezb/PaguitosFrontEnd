import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private _httpClient:HttpClient) { }

  public sendEmailByIdCredito(idCredito:string):Observable<any>{
    return this._httpClient.get(Global.backEndServer+Global.urlEmail+'/'+idCredito,{observe:'response'});
  }
}
