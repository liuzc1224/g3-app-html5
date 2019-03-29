import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgCenterPage } from './msg-center';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    MsgCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(MsgCenterPage),
    ShareModule,
    ComponentsModule
  ],
})
export class MsgCenterPageModule {}
