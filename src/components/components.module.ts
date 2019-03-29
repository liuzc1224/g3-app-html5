import { NgModule } from '@angular/core';
import { ApplyComponent } from './apply/apply';
import { IonicModule } from "ionic-angular";
import { TranslateModule } from '@ngx-translate/core';
import { InvateComponent } from './invate/invate';

import { DatePipe, MoneyFormatPipe, OrderStatusPipe, PercentPipe, AbsPipe } from '../pipe';
import { AuditingComponent } from './auditing/auditing';
import { RefuseComponent } from './refuse/refuse';
import { LoanFailComponent } from './loan-fail/loan-fail';
import { RepayComponent } from './repay/repay';
import { RestComponent } from './rest/rest';
import { OverdueComponent } from './overdue/overdue';
import { RepayQrComponent } from './repay-qr/repay-qr';
import { ModalComponent } from './modal/modal';
import { ContactListComponent } from './contact-list/contact-list';
import { ExpanBoxComponent } from './expan-box/expan-box'
import { ForgetPaypassComponent } from './forget-paypass/forget-paypass';
import { ForgetUsrpassComponent } from './forget-usrpass/forget-usrpass';
import { SetPaypassComponent } from './set-paypass/set-paypass';
import { SetUserpassComponent } from './set-userpass/set-userpass';
import { TakeCashComponent } from './take-cash/take-cash';
import { NumberPadComponent } from './number-pad/number-pad'
import { AreaListComponent } from './area-list/area-list';
import { ListModelComponent } from './list-model/list-model';
import { LoanComponent } from './loan/loan';
import { FooterServiceComponent } from './footer-service/footer-service';
import { CommonHeaderComponent } from './common-header/common-header';

const components = [
    DatePipe,
    ApplyComponent,
    AuditingComponent,
    ModalComponent,
    ExpanBoxComponent,
    PercentPipe,
    MoneyFormatPipe,
    OrderStatusPipe,
    AbsPipe,
    InvateComponent,
    CommonHeaderComponent
];

@NgModule({
    declarations: [
        ...components,
        AuditingComponent,
        RefuseComponent,
        LoanFailComponent,
        RepayComponent,
        RestComponent,
        OverdueComponent,
        RepayQrComponent,
        ContactListComponent,
        ForgetPaypassComponent,
        ForgetUsrpassComponent,
        SetPaypassComponent,
        SetUserpassComponent,
        TakeCashComponent,
        NumberPadComponent,
        AreaListComponent,
        ListModelComponent,
        LoanComponent,
        FooterServiceComponent,
    ],
    imports: [IonicModule, TranslateModule],
    exports: [...components,
        AuditingComponent,
        RefuseComponent,
        LoanFailComponent,
        RepayComponent,
        RestComponent,
        OverdueComponent,
        RepayQrComponent,
        ContactListComponent,
        ForgetPaypassComponent,
        ForgetUsrpassComponent,
        SetPaypassComponent,
        SetUserpassComponent,
        TakeCashComponent,
        NumberPadComponent,
        AreaListComponent,
        ListModelComponent,
        LoanComponent,
        FooterServiceComponent,
    ],
    entryComponents: [
        ApplyComponent,
        RepayQrComponent,
        ContactListComponent,
        ExpanBoxComponent,
        ForgetPaypassComponent,
        ForgetUsrpassComponent,
        SetPaypassComponent,
        SetUserpassComponent,
        TakeCashComponent,
        NumberPadComponent,
        AreaListComponent,
        ListModelComponent,
        LoanComponent,
        FooterServiceComponent,
        CommonHeaderComponent
    ]
})
export class ComponentsModule { };