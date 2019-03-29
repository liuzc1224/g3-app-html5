import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRewardPage } from './my-reward';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    MyRewardPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRewardPage),
    ShareModule,
    ComponentsModule
  ],
})
export class MyRewardPageModule {}
