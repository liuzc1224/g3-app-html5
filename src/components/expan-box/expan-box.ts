import { Component, ViewChild, Input } from '@angular/core';

/**
 * Generated class for the ExpanboxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expan-box',
  templateUrl: 'expan-box.html'
})
export class ExpanBoxComponent {

  text: string;
  expanStatus : boolean = false;
  @ViewChild('divWrap') divWrap;
  @ViewChild('divInner') divInner;
  @Input() innerTxt : Array<string> = [];
  @Input() headerTxt : string = '';


  constructor() {

  }
  showTxt(e){
    this.expanStatus ? this.expanStatus = false : this.expanStatus = true;
  }

}
