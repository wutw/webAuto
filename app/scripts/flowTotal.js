import $ from  './jquery-vendor.js';
import  'layui-layer';
import   'jquery.cookie';

import 'babel-polyfill';
import Height from './common/height.js';
import Ajax from './common/ajax.js';
import mix from './common/mixClass.js';
import  CommonEvent from './common/commonEvent.js';
class FlowTotal extends mix(Height,CommonEvent){
    constructor(){
        super();
        this.initDate();

    }
    initDate(){

        let date = new Date();
        $('#getMonth').text(date.getMonth()+1+'月');

        let currentDate = date.getDate();
        for(let i = 1;i<= currentDate;i++){
            let dateOption =`<option value =${i} data-id= ${i}>${i}</option>`;
            $('#getDay').append(dateOption);
        }
        $('#getDay').children(`option[data-id = ${currentDate}]`).prop('selected','true');


    }
    


}
let flowTotal = new FlowTotal();
 flowTotal.detailHeight('.messageDetail','#confirm','#messageForm');
 flowTotal.parentClicked('#flowTotal');


 