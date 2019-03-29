import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
})
export class ModalComponent {

  text: string;

  constructor(
    private modal: ViewController,
    private para: NavParams
  ) {
    this.paras = this.para.get("data");
    console.log(this.paras);
  };

  hide() {
    this.modal.dismiss(null);
  };

  paras: Array<any>;
  fire(value: any, index?: string) {
    this.modal.dismiss(value, index);
  };
}