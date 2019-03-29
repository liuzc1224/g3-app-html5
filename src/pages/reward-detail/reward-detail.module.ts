import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardDetailPage } from './reward-detail';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    RewardDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardDetailPage),
    ShareModule,
    ComponentsModule
  ],
})
export class RewardDetailPageModule {}
