    import 'babel-polyfill';
    import 'layui-layer';
    import $ from  '../jquery-vendor.js';

    class CurrentDate{

    	//当前时间
     currentTime(element){
        
        let current = this.format('yyyy/MM/dd hh:mm');
        $(element).text(current);
    }

    format(format){
    	let now = new Date();
    	let date = {
    		'M+': now.getMonth() + 1,
    		'd+': now.getDate(),
    		'h+': now.getHours(),
    		'm+': now.getMinutes(),
    		's+': now.getSeconds()
    	};

    	if(/(y+)i/.test(format)){
    		format = format.replace(RegExq.$1,now.getFullYear()+'')
    	}
    	for(let [key,value] of Object.entries(date)){
    		if((new RegExp(`(${key})`)).test(format)){
    			format = format.replace(RegExq.$1,RegExq.$1.length == 1?
    				(value+''):(value+'').padStart(2,'00'));

    		}
    		
    	}
    	return format;
    }


}
export default CurrentDate;