  
 import $ from  './jquery-vendor.js';
 import  'layui-layer';
 import 'babel-polyfill';
import  CommonEvent from './common/commonEvent.js';
import mix from './common/mixClass.js';

class Communition extends mix(CommonEvent){

    constructor(){
        super();
        this.initEvent();
        this.initHeight();
        this.parentClicked('#communicatePage');

    }
    initEvent(){
        let self = this;
        $('.messageChoice').on('click','span',self.messageChoice.bind(self));
    }



    //高度
    initHeight(){
        let costHeight = $('#container').children('h2:eq(0)').outerHeight(true)
            +$('#container').children('h2:eq(1)').outerHeight(true)+$('#container').children('div:eq(0)').outerHeight(true);

        let messageHeight = $(document.body).height()-costHeight;

        $('.message').outerHeight(messageHeight) ;
    }


    messageChoice(e){

        $(this).addClass('active').siblings('span').removeClass('active');
        if($('.sendMessage').hasClass('active')){
            $('#sendMessage').removeClass('none').siblings('.noMessageDetail').addClass('none');

        }else{
            $('#sendMessage ').addClass('none').siblings('.noMessageDetail').removeClass('none');

        }
    }
}
const communition = new Communition()