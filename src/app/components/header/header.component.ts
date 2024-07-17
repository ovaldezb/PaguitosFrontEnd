import { Component } from '@angular/core';
import { Global } from '../../service/Global';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  public tabActivo = Global.TAB_CREDITO;

  clickAction(tabAction:string){
    this.tabActivo = tabAction;
  }
}
