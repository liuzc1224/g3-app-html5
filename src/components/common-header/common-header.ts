import { Component, Input } from '@angular/core';
import bridge from '../../tools/bridge';
/**
 * Generated class for the CommonHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'common-header',
  templateUrl: 'common-header.html'
})
export class CommonHeaderComponent {


  @Input() centerTxt: string = '';
  @Input() rightTxt: string = '';
  @Input() hideCommonRight: boolean = false; //隐藏右边所有按钮 & true 显示右边所有按钮
  @Input() leftFn: Function;
  @Input() rightFn: Function;
  @Input() parent: Object;

  constructor() {
  }

  back() {
    if (this.leftFn) {
      this.leftFn(this.parent);
    }else{
      bridge['goBack']()
    }
  }

  submit() {
    if (this.rightFn) {
      this.rightFn(this.parent);
    }
  }

}
