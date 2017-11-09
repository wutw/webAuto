/**
 * Created by wtw on 2017/11/2.
 */
import 'babel-polyfill';
import 'layui-layer';

class Ajax{



    ajax({
        method = 'POST',
        url = '',
        async = true,
        data = {},
        contentType = 'application/x-www-form-urlencoded;charset=utf-8'
        }){
        return new Promise(function(resolve,reject){
            let xmlHttp = null;
            let params = [];

            if(XMLHttpRequest){
                xmlHttp = new XMLHttpRequest();
            }else{
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }


            for (let [key,value] of Object.entries(data)){

                params.push(`${key} = ${value}`);
            }
            let sendData =  params.join('&');

            if(method === 'POST'){
                xmlHttp.open(method,url,async);
                xmlHttp.setRequestHeader('Content-Type',contentType);
                xmlHttp.send(sendData);

            }
            else if(method ==='GET'){
                xmlHttp.open(method,url + '?' + sendData,async);
                xmlHttp.send(null);
            }
            xmlHttp.timeout = 12000;
            xmlHttp.ontimeout = function(){
                layer.msg("Timeout",{
                    icon:2,
                    time:1000
                });
            };
            xmlHttp.onreadystatechange = function(){
                if(xmlHttp.readyState == 4 ){
                    if( xmlHttp.status >= 200 && xmlHttp.status < 300 || xmlHttp.status == 304){
                        resolve(xmlHttp.responseText);
                    }else{
                        layer.msg(xmlHttp.status+":"+xmlHttp.statusText, {
                            icon : 2,
                            time : 1000
                        });
                    }
                }
            };
        })
    }
};

Ajax.goaheadUrl = '192.168.1.6:80/goahead/';

export default Ajax;


/*用例*/
/*eye.ajax({
 method:'POST',
 url:'',
 data:{
 'name1':'value1',
 'name2':'value2'
 },

 }).then(function(result){

 });*/