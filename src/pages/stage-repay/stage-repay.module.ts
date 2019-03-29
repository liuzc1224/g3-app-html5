import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StageRepayPage } from './stage-repay';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StageRepayPage,
  ],
  imports: [
    IonicPageModule.forChild(StageRepayPage),
    ShareModule,
    ComponentsModule
  ],
})
export class StageRepayPageModule {}
