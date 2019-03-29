import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderListPage } from './order-list';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    OrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderListPage),
    ShareModule,
    ComponentsModule
  ],
})
export class OrderListPageModule {}
