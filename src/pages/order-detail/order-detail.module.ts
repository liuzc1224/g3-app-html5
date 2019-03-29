import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailPage } from './order-detail';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'
@NgModule({
    declarations: [
        OrderDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(OrderDetailPage),
        ShareModule,
        ComponentsModule
    ],
})
export class OrderDetailPageModule {}
