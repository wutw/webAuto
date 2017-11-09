 import 'babel-polyfill';
 import $ from  '../jquery-vendor.js';

class CommonEvent{

	parentClicked(id){
        $(id,parent.document).addClass('active').siblings('li').removeClass('active');
    }

     //将后台数据赋值给文本
    initText (resultObj,element,attrStyle){

        $('span'+element).each(function(){
           let parameter = $(this).attr(attrStyle);
           let value = resultObj[parameter];
            if(value != '' && value != undefined && value!=null){

                $(this).text(value);
            }else{
                $(this).text('');
            }
        });

        $('input'+element).each(function(){
           let parameter = $(this).attr(attrStyle);
           let value = resultObj[parameter];
            if(value != '' && value != undefined && value!=null){

                $(this).val(value);
            }else{
                $(this).val('');
            }
        });


            $('select'+element).each(function(){
               let parameter = $(this).attr(attrStyle);
               let value = resultObj[parameter];
                if(value != '' && value != undefined && value !=null){

                    $(this).children('option').each(function(){
                        if($(this).val() ==value ){
                            $(this).prop('selected','true');
                        }
                    })
                }else{
                    $(this).children('option:first').prop('selected','true');
                }
            })
        }




    }
    export default CommonEvent