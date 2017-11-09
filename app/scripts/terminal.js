
import $ from  './jquery-vendor.js';
import   'jquery.cookie';
import  'layui-layer';
import 'babel-polyfill';
import Height from './common/height.js';
import Ajax from './common/ajax.js';
import CurrentDate from './common/date.js';
import mix from './common/mixClass.js';
import  CommonEvent from './common/commonEvent.js';
import Layer from './common/layer.js';

class Terminal extends mix(Height,Ajax,CommonEvent,Layer,CurrentDate){
    constructor(index = -1){
        super();
        this.initEvent();
        this.height('.messageDetail','.messageChoice');
        this.currentTime('#currentTime');
        this.parentClicked('#terminalPage');
        this.global_load_index = index;
        this.dataInit();
    }



//终端状态
dataInit(){
    let self = this;
    self.ajax({
        method: 'POST',
        url:Terminal.goaheadUrl+'systemInformation'}).then(
        (result)=> {

            if (result != null && result != '' && result != undefined) {
                let resultObj = JSON.parse(result);
                self.initText(resultObj,'.detail','id');

            }
        });
   

    //终端设置初始化数据

    self.ajax({
        method: 'POST',
        url:goaheadUrl+'terminalDataReceive'}).then(
        (result)=> {
            if (result != null && result != '' && result != undefined) {
                let resultObj = JSON.parse(result);
                self.initText(resultObj,'.setting','id');
                //时钟校验要注意
            }

        }
    )
    }

       initEvent(){
            let self = this;
            $('.messageChoice').on('click','span',self.messageChoice.bind(self));


       }
   



    messageChoice(e){
        let self = this;

        $(self).addClass('active').siblings('span').removeClass('active');
        if($('.terminalSet ').hasClass('active')){
            self.height('.messageDetail','.messageChoice');
           $('form').removeClass('none').siblings('#messageShow').addClass('none');
        }else{
            $('form').addClass('none').siblings('#messageShow').removeClass('none');
            self.detailHeight('.messageDetail','.messageChoice','body');
            self.terminalWorkMode();
        }

    }

//终端工作模式
 terminalWorkMode(){
    let self = this;
    self.ajax({
        method: 'POST',
        url:goaheadUrl+'terminalMode'}).then(
        (result)=>{

            if(result != null && result != '' && result != undefined){
                let resultObj = JSON.parse(result);

                let value;
                switch(resultObj.type){
                    case '00':
                        value = '高频模式';
                        break;
                    case '01':
                        value = '低频模式';
                        break;
                    case '02':
                        value = '物联网传输模式';
                        break;
                    case '03':
                        value = '网络管理模式';
                        break;

                }

                $('#workType').text(value);



        }})

        

        }


}
let terminal = new Terminal();

