import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetPassPage } from './set-pass';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'
@NgModule({
  declarations: [
    SetPassPage,
  ],
  imports: [
    IonicPageModule.forChild(SetPassPage),
    ShareModule,
    ComponentsModule
  ],
})
export class SetPassPageModule {}
