import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoucherCenterPage } from './voucher-center';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    VoucherCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(VoucherCenterPage),
    ShareModule,
    ComponentsModule
  ],
})
export class VoucherCenterPageModule {}
