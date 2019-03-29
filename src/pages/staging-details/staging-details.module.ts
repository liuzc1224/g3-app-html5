import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StagingDetailsPage } from './staging-details';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    StagingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StagingDetailsPage),
    ShareModule,
    ComponentsModule
  ],
})
export class StagingDetailsPageModule {}
