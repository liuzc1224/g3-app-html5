import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvatePage } from './invate';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'


@NgModule({
  declarations: [
    InvatePage,
  ],
  imports: [
    IonicPageModule.forChild(InvatePage),
    ShareModule,
    ComponentsModule
  ],
})
export class InvatePageModule {}
