import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseRewardPage } from './choose-reward';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    ChooseRewardPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseRewardPage),
    ShareModule,
    ComponentsModule
  ],
})
export class ChooseRewardPageModule {}
