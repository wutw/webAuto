
import $ from  './jquery-vendor.js';
import  'layui-layer';
import 'babel-polyfill';
import Height from './common/height.js';
import Ajax from './common/ajax.js';
import CurrentDate from './common/date.js';
import mix from './common/mixClass.js';
import  CommonEvent from './common/commonEvent.js';
class Location extends mix(CommonEvent,Ajax,Height,CurrentDate){
    constructor(){
        super();
       
        this.dataInit();

    }
    dataInit(){
        let self = this;

        self.ajax({
            method: 'POST',
            url:Location.goaheadUrl+'locationDataReceive'
        }).then(function (result) {

                if (result != null && result != '' && result != undefined) {
                    let resultObj = JSON.parse(result);
                    self.initText(resultObj,'.detail','id');

                }
            }
        )
        


}
}
const location = new Location();
    location.parentClicked('#locationPage');
    location.height('.messageDetail','.messageChoice');
    location.currentTime('#currentTime');

 