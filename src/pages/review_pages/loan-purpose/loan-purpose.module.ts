import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanPurposeComponent } from './loan-purpose';
import { ShareModule } from '../../../share/share.module'
@NgModule({
  declarations: [
      LoanPurposeComponent,
  ],
  imports: [
    IonicPageModule.forChild(LoanPurposeComponent),
    ShareModule
  ],
})
export class LoanPurpostPageModule {}
