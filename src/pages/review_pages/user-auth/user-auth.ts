import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImgService, LoadingService, ReviewService, TipService, UserActionService } from '../../../service';
import { filter } from 'rxjs/operators';
import { Response } from '../../../share/model';
import { IonicPage, NavController } from 'ionic-angular'
import { now } from "../../../tools";
import { Before, CombineAll } from "../../../decorators/function.decorator";
import { Observable } from "rxjs";

@IonicPage({
    name : "UserAuthPage"
})
@Component({
    selector: 'user-auth',
    templateUrl: 'user-auth.html'
})
export class UserAuthComponent implements OnInit{
    parent = this;
    constructor(
        private fb : FormBuilder ,
        private img : ImgService ,
        private reviewSer : ReviewService ,
        private msg : TipService ,
        private nav : NavController ,
        private loadSer : LoadingService ,
        private userAction : UserActionService,
        private zone: NgZone
    ){};

    front : string = '../assets/imgs/auth/front.png' ;

    reverse : string = '../assets/imgs/auth/back.png' ;

    hand : string = '../assets/imgs/auth/hand.png' ;

    postData : FormData = new FormData() ;

    postFaceData : FormData = new FormData() ;

    validForm : FormGroup ;

    imgLoads : Object = {
        front : {
            hasOwn : false ,
            loadComplete : false
        },
        reverse : {
            hasOwn : false ,
            loadComplete :  false
        }
        ,
        hand : {
            hasOwn : false ,
            loadComplete :  false
        }
    };
    ngOnInit(){
        this.postData = new FormData() ;
        this.postFaceData = new FormData() ;
        this.initForm() ;
        this.getAuthInfo() ;
    };

    initForm(){
        this.validForm = this.fb.group({
            "idNumber" : [null , [Validators.required ] ] ,
            "username" : [null , [ Validators.required ] ] ,
            "motherFirstName" : [null],
            "fatherFirstName" : [null] ,
            "isFirst" : [true , [Validators.required]]
        });
    };

    @Before(function(){
        return new Observable( obsr => {
            if(!this.validForm.valid){
                this.msg.require();
                return ;
            };
            obsr.next("success") ;
        });
    })
    @Before(function(){
        return new Observable( obsr => {
            let obj = this.riskTime ;
            obj['nextStep'] = now() + "," ;
            this.userAction.auth(obj) ;
            obsr.next("success") ;
        })
    })
    @CombineAll()
    nextBtn($event){
        const data = this.validForm.value ;

        if(data.isFirst && ( !this.postData.get("front") || !this.postData.get("reverse") || (!this.postData.get("hand")&&this.faceFlag != 1) ) ){
            this.msg.require();
            return;
        };

        if(!this.postData.get("idNumber"))
            this.postData.append("idNumber" , data.idNumber);

        if(!this.postData.get("username"))
            this.postData.append("username" , data.username);

        if(!this.postData.get("motherFirstName"))
            this.postData.append("motherFirstName" , data.motherFirstName);

        if(!this.postData.get("fatherFirstName"))
            this.postData.append("fatherFirstName" , data.fatherFirstName) ;

        if(!this.postData.get("isFirst"))
            this.postData.append("isFirst" , data.isFirst) ;

        let el = <HTMLButtonElement>$event.target ;

        el.disabled = true ;

        let model = this.loadSer.deal();

        model.present() ;

        this.reviewSer.saveAuth(this.postData)
            .pipe(
                filter(
                    (res : Response) => {

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };
                        if (this.faceFlag != 1) {
                            model.dismiss() ;
                        }

                        el.disabled = false ;

                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                ( res : Response ) => {
                    if (this.faceFlag) {
                        console.log('开始人脸识别')
                        this.getFace(model)
                    }else{
                        this.slideTo("UserInfoPage") ;
                    }
                }
            );
    };

    takeCam(name : string){
        this.makeRecord(name);
        this.img.takeCam()
            .subscribe(
                (data) => {
                    console.log('照片回调----imgchange---', data);

                    if (data['code'] === 1) {
                        const base64 = "data:image/jpeg;base64," + data['imageBase64'];
                        this.zone.run(()=>{
                            this[name] = base64 ;
                        })
                        const pictureTrueSize = data['pictureTrueSize'];
                        const pictureUri = data['pictureUri'];
                        const resolutionCap = data['resolutionCap'];

                        if(this.postData.has(name))
                            this.postData.delete(name);

                        const file = this.img.base64ToImg(<string>base64) ;

                        this.postData.append(name , file) ;
                        this.postData.append(name + 'Size' , pictureTrueSize) ;
                        this.postData.append(name + 'Path' , pictureUri) ;
                        this.postData.append(name + 'ResolutionCap' , resolutionCap) ;
                        //成功
                    }else if(data['code'] === 2){
                        //取消
                    }else if(data['code'] === 0){
                        //拒绝
                    }
                }
            )
    };


    getFace(model){
        this.img.getFace()
            .subscribe(
                (data) => {
                    console.log('人脸识别： ', data);

                    if (data === 'success') {
                        this.slideTo("UserInfoPage") ;
                        //成功
                    }else{
                        console.log('人脸识别： 失败');
                    }
                    model.dismiss();
                }
            )
    }

    postFace(model){
        this.reviewSer.saveFace(this.postFaceData)
            .subscribe(
                ( res :Response ) => {
                    this.slideTo("UserInfoPage") ;
                    model.dismiss();
                }
            )
    }

    resMark : boolean = false ;
    faceFlag: Number = 0;

    getAuthInfo(){
        this.reviewSer.getAuth()
            .pipe(
                filter(
                    (res : Response) => {
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
                    if(res.data['front'] != null){
                        this.front = res.data['front'];
                        this.imgLoads['front']['hasOwn'] = true ;
                    }

                    if(res.data['reverse'] != null){
                        this.imgLoads['reverse']['hasOwn'] = true ;
                        this.reverse = res.data['reverse'];
                    };

                    if(res.data['hand'] != null){
                        this.hand = res.data['hand'];
                        this.imgLoads['hand']['hasOwn'] = true ;
                    };

                    if(res.data['modifyTime'] != null){
                        res.data['isFirst'] = false ;
                    };

                    this.faceFlag = res.data['faceCompareButton'];

                    this.validForm.patchValue(< Object >res.data) ;
                }
            )
    };

    slideTo( name  , step ? ){
        if(name !== false)
            this.nav.push(name) ;

        if(step !== undefined){
            let obj = this.riskTime ;
            obj['stepId'] = step ;
            obj['step'] = now().toString() ;

            this.userAction.auth(obj) ;
        };
    };

    back(par){
        let obj = par.riskTime ;
        obj['topBack'] = now() + "," ;
        par.userAction.auth(obj) ;
        par.nav.pop() ;
    };

    imgLoadComplete($evnet : "front" | "reverse" | "hand" ){
        this.imgLoads[$evnet]['loadComplete'] = true ;
    };

    riskTime = {
        "idNumber": "",
        "nextStep": "",
        "step": "",
        "stepId": "" ,
        "username": "",
        "topBack": "",
        "front" : "",
        "reverse" : "",
        "hand" : ""
    };

    makeRecord(name : string){
        this.riskTime[name] += now() + "," ;
    };
};