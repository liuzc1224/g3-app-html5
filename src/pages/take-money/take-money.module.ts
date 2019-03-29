import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakeMoneyPage } from './take-money';

@NgModule({
  declarations: [
    TakeMoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(TakeMoneyPage),
  ],
})
export class TakeMoneyPageModule {}
