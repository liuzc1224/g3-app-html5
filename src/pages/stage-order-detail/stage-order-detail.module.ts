import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StageOrderDetailPage } from './stage-order-detail';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    StageOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StageOrderDetailPage),
    ShareModule ,
    ComponentsModule
  ],
})
export class StageOrderDetailPageModule {}
