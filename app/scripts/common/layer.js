    import 'babel-polyfill';
    import  'layui-layer';
    import $ from  '../jquery-vendor.js';
   class Layer{

       
        //加载
        loading(msg = '加载中，请稍候...'){
            let message = msg;
            this.global_load_index = layer.load(2,message);
           

    }
        //关闭加载
        closeLoading(i){
            let index = i ||  this.global_load_index;
            return  layer.close(index);

        }
        //信息确认
        confirm(msg,option,yes,no){
            return layer.confirm(msg,option,yes,no);
        }
        
        //提示  style:1成功；2：失败
        msg(msg,style = 1,time = 2000){
            layer.msg(msg,{
                icon:style,
                time:time 
            })

        }
        //确认信息
        alert(msg,fn,yes){
            layer.alert(msg,fn,yes);
        }

    }
    export default Layer;