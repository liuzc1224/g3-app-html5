import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceCenterPage } from './service-center';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        ServiceCenterPage,
    ],
    imports: [
        IonicPageModule.forChild(ServiceCenterPage),
        ShareModule,
        ComponentsModule
    ],
})
export class ServiceCenterPageModule {};