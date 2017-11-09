 import 'babel-polyfill';
  import $ from  '../jquery-vendor.js';
class Height{

	 height(message,otherElement){
        let screenWidth = screen.width;
        if( screenWidth< 1920) {
            let messageHeight = $(window).height() - $(otherElement).outerHeight(true) - 110 + 'px';
            $(message).css('height', messageHeight);
        }else{
            $(message).css('height', '600px');
        }
    }
    //流量统计，数据传输信息框高度
     detailHeight(messageElement,otherElement,totalElement){

        if(screen.width<1920){
            let messageHeight = $(totalElement).outerHeight(true)-$(otherElement).outerHeight(true);
            $(messageElement).outerHeight(messageHeight);
        }else{
            $(messageElement).outerHeight('650px');
        }
    }
    }

    export default Height;