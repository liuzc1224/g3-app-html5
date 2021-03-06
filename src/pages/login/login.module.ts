import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    ShareModule,
    ComponentsModule
  ],
  entryComponents : [ LoginPage ]
})
export class LoginPageModule {}