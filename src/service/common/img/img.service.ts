import { Injectable } from '@angular/core';
import { SesssionStorageService } from "../storage";
import { Observable } from 'rxjs';
import bridge from '../../../tools/bridge';

@Injectable()
export class ImgService{

    constructor(
        private sgo : SesssionStorageService
    ){};

    takeCam(){

        return new Observable( resove => {
            bridge['openCamera'](null, ( res )=>{
                resove.next(JSON.parse(res))
            } );
            // this.camera.getPicture(options)
            //     .then(
            //         data => {
            //             // @param { string } cameraFrontCameraPixel 手机前摄像头像素
            //             // @param { string } cameraRearCameraPixel 手机后摄像头像素
            //             // @param { string } cameraFrontNumber 手机前摄像头数量
            //             // @param { string } cameraRearNumber 手机后摄像头数量
            //             // @param { string } pictureTrueSize  图片大小 MB
            //             // @param { string } pictureUriTrue：原图地址
            //             // @param { string } pictureUri 压缩后图片地址
            //             // @param { string } resolutionCap 压缩后图片像素
            //             // @param { string } resolutionCapTure 原图像素

            //             let camInfo = {
            //                 cameraFrontCameraPixel : "" ,
            //                 cameraRearCameraPixel : "" ,
            //                 cameraRearNumber : "" ,
            //                 cameraFrontNumber : "" ,
            //                 pictureTrueSize : '' ,
            //                 pictureUri : '' ,
            //                 data_uri : '' ,
            //                 resolutionCap : ''
            //             } ;

            //             for (let i = 0; i < data.camera.length; i++) {
            //                 if (data.camera[i]['cameraFrontCameraPixel']) {
            //                     camInfo['cameraFrontCameraPixel'] = data.camera[i]['cameraFrontCameraPixel'];
            //                 }else if(data.camera[i]['cameraRearCameraPixel']){
            //                     camInfo['cameraRearCameraPixel'] = data.camera[i]['cameraRearCameraPixel']
            //                 }
            //             }

            //             if(data['cameraFrontNumber']){
            //                 camInfo['cameraFrontNumber'] = data['cameraFrontNumber']
            //             };

            //             if(data['cameraRearNumber']){
            //                 camInfo['cameraRearNumber'] = data['cameraRearNumber']
            //             };

            //             if(data['pictureTrueSize']){
            //                 camInfo['pictureTrueSize'] = data['pictureTrueSize']
            //             };

            //             if(data['pictureUri']){
            //                 camInfo['pictureUri'] = data['pictureUri']
            //             };

            //             if(data['resolutionCap']){
            //                 camInfo['resolutionCap'] = data['resolutionCapTure'] ;
            //             };
            //             if(data.data_uri){
            //                 camInfo['data_uri'] = data.data_uri;
            //                 resove.next(camInfo);
            //             };
            //         }
            //     )
            //     .catch(
            //         err => {
            //             resove.error(err) ;
            //         }
            //     )
        })
    };

    getFace(){

        return new Observable( resove => {
            bridge['uploadfaceNow'](null, ( res )=>{
                // resove.next(JSON.parse(res))
                resove.next(res)
            } );
        })
    };

    // takeAlbum( quality : number = 100 , sacle : boolean = true){
    //     const options: CameraOptions = {
    //         quality: quality,
    //         destinationType: this.camera.DestinationType.DATA_URL ,
    //         encodingType: this.camera.EncodingType.JPEG,
    //         mediaType: this.camera.MediaType.PICTURE ,
    //         sourceType : 0
    //     };

    //     if(sacle){
    //         options['allowEdit'] = true ;
    //         options['targetWidth'] = 200  ;
    //         options['targetHeight'] = 200  ;
    //     };

    //     return new Observable( resove => {
    //         this.camera.getPicture(options)
    //             .then(
    //                 data => {
    //                     resove.next("data:image/jpeg;base64," + data.data_uri)
    //                 }
    //             )
    //             .catch(
    //                 err => {
    //                     resove.error(err) ;
    //                 }
    //             )
    //     })
    // };

    base64ToImg(base64Data : string){
        let byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0)
            byteString = window['atob'](base64Data.split(',')[1]);
        else
            byteString = window['unescape'](base64Data.split(',')[1]);

        let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];

        let ia = new Uint8Array(byteString.length);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        };

        return new Blob([ia], {type:mimeString});
    }
};