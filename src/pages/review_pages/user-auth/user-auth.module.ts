import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAuthComponent } from './user-auth';
import { ShareModule } from '../../../share/share.module'
@NgModule({
  declarations: [
      UserAuthComponent
  ],
  imports: [
    IonicPageModule.forChild(UserAuthComponent),
    ShareModule
  ],
})
export class UserAuthPageModule {};