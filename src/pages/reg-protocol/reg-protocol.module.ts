import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegProtocolPage } from './reg-protocol';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module';
@NgModule({
    declarations: [
        RegProtocolPage,
    ],
    imports: [
        IonicPageModule.forChild(RegProtocolPage),
        ShareModule,
        ComponentsModule
    ],
})
export class RegProtocolPageModule {}
