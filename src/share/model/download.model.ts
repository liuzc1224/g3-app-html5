/*
    更新app的会掉数据模型
    @param number status : 1 成功 , 2 : 失败 , 3 下载完成
    @param string | number data : 下载进度或者失败原因
 */
export interface DownloadModel {
    status : 1 | 2 | 3 ;
    data : string | number
};