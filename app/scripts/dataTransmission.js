
import $ from  './jquery-vendor.js';
import Ajax from './common/ajax.js';
  import  'layui-layer';
import 'babel-polyfill';
import Height from './common/height.js';
import mix from './common/mixClass.js';
import  CommonEvent from './common/commonEvent.js';

class DataTransmission extends mix(Height,CommonEvent,Ajax){
    constructor(){
        super();
        this.detailHeight('.messageDetail','#confirm','body');
        this.parentClicked('#dataTransmission')
        this.dataInit();
        this.initEvent();
    }


    //数据传入
     dataInit () {
        let self = this;

        let checkItem =  $('.serialChoice input:checked').val();

        self.ajax({
            url:DataTransmission.goaheadUrl+'dataReceive',
            method: 'POST',
            data:{
                "serialPort":checkItem

            }}).then(function(result) {
                if (result != null && result != '' && result != undefined) {
                    let resultObj = JSON.parse(result);

                    $('.serialChoice input').each(function () {
                        if ($(this).val() == resultObj.serialPort) {
                            $(this).prop('checked', 'true');
                        }
                    });
                     self.initText(resultObj, '.detail', 'id');
                    //时钟校验未处理
                }
            })

        }




    
    initEvent(){

        let self = this;
        $('.serialChoice').on('click','input',self.dataInit.bind(self));


    }

}
let dataTransmission = new DataTransmission();





