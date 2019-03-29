import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events, ActionSheetController } from 'ionic-angular';
// import { HomePage } from '../pages/home/home';
import { TranslateService } from '@ngx-translate/core';
import { SesssionStorageService, UserService } from '../service';
import { filter } from 'rxjs/operators';
import { Response } from '../share/model';
import { TipService } from '../service';
import { KeyboardUtil } from '../tools/heightchange';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = 'LoanPurposePage';

    pages: Array<{ title: string, component: any }>;

    constructor(
        public platform: Platform,
        private translate: TranslateService,
        private sgo: SesssionStorageService,
        private menu: MenuController,
        private event: Events,
        private action: ActionSheetController,
        private userSer: UserService,
        private msg: TipService,
    ) {
        this.initializeApp();
        // used for an example of ngFor and navigation

        let broswerLang = window.navigator.language;

        window.sessionStorage.setItem("locale", broswerLang);
        window.sessionStorage.setItem("areaCode", '55');
        // let broswerLang = "zh-CN";

        this.translate.setDefaultLang("zh-CN");

        this.translate.getTranslation("zh-CN")
            .subscribe(
                res => {
                    this.sgo.set("lang", res);
                }
            );
        this.loginInfo = this.sgo.get('loginInfo');

        if (!this.loginInfo) {
            let notify = this.event
                .subscribe("login", (data) => {
                    this.loginInfo = data;
                    if (this.loginInfo)
                        this.headImg = this.loginInfo['headPortrait'] ? this.loginInfo['headPortrait'] : './assets/imgs/avatar.png';
                });
        };
    };

    initializeApp() {
        this.platform.ready().then(() => {

            KeyboardUtil.FixAndroidKeyBoardHideInput();

            // this.statusBar.styleDefault();

            // this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    };

    activeMenu: number = null;

    private strategy = {
        "1": () => {
            this.menu.close();
            this.nav.push("OrderListPage");
        },
        "2": () => {
            this.menu.close();
            this.nav.push("MyRewardPage");
        },
        "3": () => {
            this.menu.close();
            this.nav.push("ServiceCenterPage");
        },
        "4": () => {
            this.menu.close();
            this.msg.notOpen();
        },
        "5": () => {
            this.menu.close();
            this.nav.push("AboutUsPage");
        },
        "6": () => {
            this.menu.close();
            this.nav.push("AboutRepayPage");
        },
        "7": () => {
            this.menu.close();
            this.nav.push("ConfigPage");
        },
        "8": () => {
            if (this.userSer.hasLogin()) {
                this.userSer.logout()
                    .pipe(
                        filter(
                            (res: Response) => {
                                if (res.success === false) {
                                    this.msg.operateFail(res.message);
                                }
                                return res.success === true;
                            }
                        )
                    )
                    .subscribe(
                        res => {
                            this.menu.toggle();
                            this.msg.operateSuccess();
                            this.loginInfo = {};
                            this.sgo.remove(["loginInfo", "orderInfo"]);

                        }
                    )
                this.platform.exitApp();
            } else {
                this.platform.exitApp();
            };
        }
    };

    selectMenu(index: number) {
        this.activeMenu = index;

        if (this.userSer.hasLogin() || index == 8)
            this.strategy[index].call(this);
        else {
            this.menu.close();
            this.nav.push("LoginPage")

        }
    };

    headImg: any = './assets/imgs/avatar.png';

    loginInfo: Object;

    checkLogin() {
        if (!this.loginInfo) {
            this.menu.close();
            this.nav.push("LoginPage")
        } else {
            let sheet = this.action.create({
                buttons: [
                    {
                        text: 'Foto do álbum',
                        handler: () => {
                            this.takeCam();
                        }
                    },
                    {
                        text: 'Tirar foto',
                        handler: () => {
                            this.takeAlbum();
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: "c-text-red"
                    }
                ]
            });
            sheet.present();
        }
    };

    takeCam() {
    };

    takeAlbum() {
    };

};