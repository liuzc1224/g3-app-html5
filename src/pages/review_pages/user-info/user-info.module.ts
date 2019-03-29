import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoComponent } from './user-info';
import { ShareModule } from '../../../share/share.module'
@NgModule({
  declarations: [
      UserInfoComponent
  ],
  imports: [
    IonicPageModule.forChild( UserInfoComponent),
    ShareModule
  ],
})
export class UserInfoPageModule {};