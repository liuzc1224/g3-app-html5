import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserIncomeComponent } from './user-income';
import { ShareModule } from '../../../share/share.module';

@NgModule({
  declarations: [
      UserIncomeComponent
  ],
  imports: [
    IonicPageModule.forChild(UserIncomeComponent),
    ShareModule
  ],
})
export class UserInComePageModule{};