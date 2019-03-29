import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigPage } from './config';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    ConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigPage),
    ShareModule,
    ComponentsModule
  ],
})
export class ConfigPageModule {}
