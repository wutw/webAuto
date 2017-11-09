
import $ from  './jquery-vendor.js';

import  'layui-layer';
import 'babel-polyfill';
import Ajax from './common/ajax.js';
import mix from './common/mixClass.js';
import  CommonEvent from './common/commonEvent.js';

class MainSub extends mix(Ajax,CommonEvent){
    constructor(index = -1){
        super();
       
        this.parentClicked('#indexPage');
        this.global_load_index = index;
        this.statusInit();
    }


//连接状态

    statusInit(){
        let self = this;
        self.ajax({
            method: 'POST',
            url:MainSub.goaheadUrl+'LinkStatus'}).then(
            (result) => {

                if(result != null && result != '' && result != undefined){
                    let resultObj = result;
                    if(resultObj.terminalType == '00'){
                        $('.terminalStatus').children('img').attr('src','themes/images/arrowR.png');

                    }else{
                        $('.terminalStatus').children('img').attr('src','themes/images/errorArrowR.png');


                    }

                    if(resultObj.satelliteType == '00'){
                        $('.equipmentStatus img:eq(0)').attr('src','themes/images/arrowR.png').next().attr('src','themes/images/arrowL.png');


                    }else{
                        $('.equipmentStatus img:eq(0)').attr('src','themes/images/errorArrowR.png').next().attr('src','themes/images/errorArrowL.png');

                    }
                }



            })
        }
           



    }
    let mainSub = new MainSub();