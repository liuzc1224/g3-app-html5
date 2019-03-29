import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineServicePage } from './online-service';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    OnlineServicePage,
  ],
  imports: [
      IonicPageModule.forChild(OnlineServicePage),
      ShareModule,
      ComponentsModule
  ]
})
export class OnlineServicePageModule {}
