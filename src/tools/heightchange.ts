export class KeyboardUtil {

    private static height:number;
    private static visibleHeight:number;

    static FixAndroidKeyBoardHideInput(){
        window['heightChange'] = (height :number , visibleHeight:number)=>{
            KeyboardUtil.OnHeightChange(height,visibleHeight);
        }
    }

    static OnHeightChange(height :number , visibleHeight:number):void{
        const body = document.body;
        KeyboardUtil.height = body.clientHeight;
        KeyboardUtil.visibleHeight = visibleHeight * body.clientHeight /height;

        const active = document.activeElement as HTMLElement;

        if(height == visibleHeight){
            KeyboardUtil.SetElementScrollTop(body , 0);
            return;
        }

        let focusTopRelateWindow = KeyboardUtil.FindElementPositionRelateToWindow(active);
        let focusBottomRelateWindow = focusTopRelateWindow + active.clientHeight;
        const mindistince = 50;
        let bottom = focusBottomRelateWindow + mindistince;
        if(bottom > KeyboardUtil.height) bottom = KeyboardUtil.height;

        const offset = bottom - KeyboardUtil.visibleHeight;

        if(offset <=0){
            KeyboardUtil.SetElementScrollTop(body , 0);
            return;
        }

        KeyboardUtil.SetElementScrollTop(body , offset);

    }

    static SetElementScrollTop(e : HTMLElement , offset : number){
        if(offset == 0){
            e.style.top = '0';
        }else{
            e.style.top = '-'+offset +'px';
        }
    }

    static FindElementPositionRelateToWindow(element: HTMLElement) {
        let curtop = 0;
        let curtopscroll = 0;
        if (element.offsetParent) {
            do {
                curtop += element.offsetTop;
                curtopscroll += element.offsetParent ? element.offsetParent.scrollTop : 0;
            } while (element = element.offsetParent as HTMLElement);


        }
        return curtop - curtopscroll;
    }
}