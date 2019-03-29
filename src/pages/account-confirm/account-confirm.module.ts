import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountConfirmPage } from './account-confirm';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'
@NgModule({
  declarations: [
    AccountConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountConfirmPage),
    ShareModule,
    ComponentsModule
  ],
})
export class AccountConfirmPageModule {}
