import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutUsPage } from './about-us';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'
@NgModule({
  declarations: [
    AboutUsPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutUsPage),
    ShareModule,
    ComponentsModule
  ],
})
export class AboutUsPageModule {}
