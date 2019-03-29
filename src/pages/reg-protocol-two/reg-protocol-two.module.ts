import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegProtocolTwoPage } from './reg-protocol-two';
import { ShareModule } from '../../share/share.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
    declarations: [
        RegProtocolTwoPage,
    ],
    imports: [
        IonicPageModule.forChild(RegProtocolTwoPage),
        ShareModule,
        ComponentsModule
    ],
})
export class RegProtocolTwoPageModule {}
