import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPaypassPage } from './account-paypass';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'
@NgModule({
  declarations: [
    AccountPaypassPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPaypassPage),
    ShareModule,
    ComponentsModule
  ],
})
export class AccountPaypassPageModule {}
