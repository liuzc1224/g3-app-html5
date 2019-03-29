import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutRepayPage } from './about-repay';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'


@NgModule({
  declarations: [
    AboutRepayPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutRepayPage),
    ShareModule,
    ComponentsModule
  ],
})
export class AboutRepayPageModule {}
