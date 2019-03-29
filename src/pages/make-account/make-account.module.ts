import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeAccountPage } from './make-account';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'
@NgModule({
  declarations: [
    MakeAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeAccountPage),
    ShareModule,
    ComponentsModule
  ],
})
export class MakeAccountPageModule {}
