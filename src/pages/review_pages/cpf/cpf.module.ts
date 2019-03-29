import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CpfComponent } from './cpf';
import { ShareModule } from '../../../share/share.module';
@NgModule({
  declarations: [
      CpfComponent
  ],
  imports: [
    IonicPageModule.forChild(CpfComponent),
    ShareModule
  ],
})
export class CpfPageModule {}
