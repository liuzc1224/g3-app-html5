import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SesssionStorageService , LocalStorageService , TipService , LoadingService } from '../service/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './interceptor.service';
import {
    LoanService ,
    ImgService ,
    UserService ,
    OrderService ,
    ReviewService ,
    ContactService ,
    MsgService ,
    AccountService ,
    RiskService,
    UserActionService ,
    SystemService,
    UploadRisk,
} from '../service/';
import { ComponentsModule } from '../components/components.module';
import { IonicStorageModule } from '@ionic/storage' ;
const commonComponents = [

];


const services = [
    SesssionStorageService ,
    LocalStorageService ,
    TipService ,
    LoanService ,
    UserService ,
    ImgService ,
    LoadingService ,
    OrderService ,
    ReviewService ,
    ContactService ,
    MsgService ,
    AccountService ,
    RiskService ,
    UserActionService ,
    SystemService ,
    UploadRisk
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        ComponentsModule ,
        IonicStorageModule.forRoot()
    ],
    declarations: [
        ...commonComponents,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...commonComponents,
        TranslateModule,
        ComponentsModule
    ],
    providers: [
        ...services,
        {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true}
    ]
})
export class ShareModule {
}
