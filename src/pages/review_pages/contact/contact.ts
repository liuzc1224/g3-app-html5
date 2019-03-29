import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup , FormBuilder , Validators , FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ReviewService, TipService, ContactService, LoadingService, SesssionStorageService, OrderService, UserActionService, UploadRisk} from '../../../service';
import { filter } from 'rxjs/operators';
import { Response } from '../../../share/model' ;
import { ModalController, IonicPage, NavController } from 'ionic-angular';
import { ContactListComponent } from '../../../components/contact-list/contact-list' ;
import { ListModelComponent } from "../../../components/list-model/list-model";
import { Before, CombineAll } from "../../../decorators/function.decorator";
import { Observable } from "rxjs";
import { now } from "../../../tools";
import bridge from '../../../tools/bridge';
@IonicPage({
    name : "ContactPage"
})
@Component({
    selector: 'contact',
    templateUrl: 'contact.html'
})
export class ContactComponent implements OnInit{
    parent = this;
    constructor(
        private fb : FormBuilder ,
        private translate : TranslateService ,
        private reviewSer : ReviewService ,
        private msg : TipService ,
        private contactSer : ContactService ,
        private modelCtr : ModalController ,
        private nav : NavController ,
        private loadSer : LoadingService ,
        private sgo : SesssionStorageService ,
        private orderSer : OrderService ,
        private userAction : UserActionService,
        private uploadRisk : UploadRisk,
    ){};

    @Output() next : EventEmitter<any> = new EventEmitter() ;

    ngOnInit(){
        this.initForm() ;
        this.getLang() ;
        this.add(3) ;
        this.getContact() ;
    };

    validForm : FormGroup ;

    initForm(){
        this.validForm = this.fb.group({
            "userContactInputVOS": this.fb.array([])
        });
    };

    add(times: number = 3, itemInfo?: object) {
        for (let i = 0; i < times; i++) {
            const control = <FormArray>this.validForm.controls['userContactInputVOS'];
            control.push(this.createContact(i + 1, itemInfo));
        };
    };

    createContact( level: number, item: Object ) {
        return this.fb.group({
            "contactGrade": [level, [Validators.required]],
            "contactName": [item && item['contactName'] ? item['contactName'] : null],
            "contactPhone": [item && item['contactPhone'] ? item['contactPhone'] : null , [ Validators.required ] ],
            "relation": [null, [Validators.required]]
        });
    };

    get userContactInputVOS(): FormArray {
        return this.validForm.get("userContactInputVOS") as FormArray;
    };

    enum_relation : Array< {name : string , value : string } > ;


    getLang(){
        this.translate.stream(['enum' , 'tip'])
            .subscribe(
                lang => {
                    this.enum_relation = lang['enum']['relation'] ;
                    this.canNotSameTip = lang['tip']['canNotSame'] ;
                }
            )
    };


    @Before(function(){
        // 检测表单是否合法
        return new Observable( obsr => {
            console.log("校验联系人表单开始") ;
            if(!this.validForm.valid){
                this.msg.require() ;
                return ;
            };
            obsr.next("success") ;
        })
    })
    @Before(function(){
        let model = this.loadSer.deal(' Enviando') ;
        model.present() ;
        return new Observable( obsr => {
            console.log("打开加载框") ;
            obsr.next(model) ;
        })
    })
    @Before(function($event, $model){
        // 保存联系人
        return new Observable( obsr => {
            console.log("开始保存联系人信息") ;
            const data = this.validForm.value ;
            this.reviewSer.saveContact(data)
                .pipe( filter( ( res : Response ) => {
                    if(res.success === false){
                        this.msg.operateFail(res.message) ;
                        $model.dismiss() ;
                    }
                    return res.success === true ;
                }))
                .subscribe( res => obsr.next("success")) ;
        });
    })
    @Before(function($event, $model){
        return new Observable( obsr => {
            this.uploadRisk.riskInfo()
                .subscribe(
                    res=>{
                        console.log(res);
                        if (res['code'] === 0 ) {
                            obsr.next('success')
                        }else{
                            this.msg.fetchFail(res.message)
                            $model.dismiss() ;
                        }
                    }
                )
        })
    })
    @CombineAll()
    nextBtn($event , model){
        return new Observable( obsr => {
            this.riskTime['nextStep'] = now() + ",";
            this.userAction.contact(this.riskTime) ;
            console.log("开始创建订单") ;
            this.createOrder(model , $event , obsr) ;
        });
    };
    resMark : boolean = false ;
    getContact(){
        this.reviewSer.getContact()
            .pipe(
                filter(
                    ( res : Response ) => {
                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        this.resMark = true ;

                        return res.success === true && res.data != null ;
                    }
                )
            )
            .subscribe(
                (res : Response) => {
                    ( <Array<any>>res.data ).forEach( (item , index ) => {
                        this.validForm.get("userContactInputVOS")['controls'][index].patchValue(item)
                    });
                }
            );
    };

    selectContact(index : number){
        let loadModel = this.loadSer.deal() ;

        loadModel.present() ;

        this.contactSer.getContact()
            .subscribe(
                data => {
                    loadModel.dismiss() ;
                    if (!data['length']) {
                        return false;
                    }
                    let model = this.modelCtr.create(ContactListComponent , {list : data} ) ;

                    model.onDidDismiss(data => {
                        let sameMark : boolean = false ;
                        if(data){
                            let value = {
                                "contactPhone" : data.contactPhones[0] || ""
                            };

                            let arr = this.validForm.value['userContactInputVOS'] ;

                            arr.forEach( item => {
                                if(item['contactPhone'] == value.contactPhone ){
                                    sameMark = true ;
                                };
                            });

                            if(!sameMark)
                                this.validForm.get("userContactInputVOS")['controls'][index].patchValue(value) ;
                            else
                                this.msg.operateWarn(this.canNotSameTip)
                        }
                    });
                    model.present() ;
                }
            );
    };

    showModel( value :string , itemName : string , index : number ){
        this.makeRecord(itemName, index)
        let data = this[value] ;

        let model = this.modelCtr.create( ListModelComponent , { list : data } ) ;

        model.onDidDismiss(data => {
            if(data){
                let obj = {} ;

                obj[itemName] = data.value ;

                this.validForm.get("userContactInputVOS")['controls'][index].patchValue(obj)
            };
        });
        model.present() ;
    };

    slideTo(name : string | boolean , step? ){
        if(step !== undefined){
            let obj = this.riskTime ;
            obj['stepId'] = step;
            obj['step'] = now() + "," ;
            this.userAction.contact(obj) ;
        };

        if(name !== false)
            this.nav.push(<string>name) ;
    };

    canNotSameTip : string ;

    createOrder(model , el : HTMLButtonElement , obsr){
        const loginInfo = this.sgo.get('loginInfo');

        const loanPurpose = this.sgo.get("loanPurpose") ;

        const postData = {
            loanPurpose : loanPurpose ,
            userPhone : loginInfo['phoneNumber']
        };

        this.orderSer.create(postData)
            .pipe(
                filter(
                    (res : Response) => {

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        model.dismiss() ;

                        el.disabled = false ;
                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                ( res : Response ) => {
                    obsr.next("success") ;
                    this.sgo.remove(['loanPurpose']) ;
                    bridge['goHome']();
                    // this.nav.setRoot(HomePage) ;
                }
            );
    };

    back(par){
        let data = par.riskTime ;
        data['topBack'] += now() + "," ;
        par.userAction.contact(data) ;
        par.nav.pop() ;
    };
    riskTime = {
        contactVO : [
            {
                contactName : "" ,
                contactPhone : "" ,
                relation : "" ,
                contactGrade : "1"
            }, {
                contactName : "" ,
                contactPhone : "" ,
                relation : "" ,
                contactGrade : "2"
            },{
                contactName : "" ,
                contactPhone : "" ,
                relation : "" ,
                contactGrade : "3"
            }
        ] ,
        "step": "",
        "stepId": "",
        "nextStep": "",
        "topBack": "",
    };

    makeRecord(name : string , step?){
        if(step !== undefined){
            this.riskTime.contactVO[step][name] += now() + "," ;
        };
    }
};
