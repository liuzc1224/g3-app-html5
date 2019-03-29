import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistPage } from './regist';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'
@NgModule({
  declarations: [
    RegistPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistPage),
    ShareModule,
    ComponentsModule
  ],
})
export class RegistPageModule {}
