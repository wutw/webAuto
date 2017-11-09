
import $ from  './jquery-vendor.js';
import  'layui-layer';
import   'jquery.cookie';
import   './validate.js';
import   'jquery-validation';
import  'babel-polyfill';
import Ajax from './common/ajax.js';
import Layer from './common/layer.js';
import mix from './common/mixClass.js';
  
class Index extends mix(Ajax,Layer){
    constructor(index = -1){
        super();
        this.global_load_index = index;
        this.login_btn = '#loginBtn';
        this.forget_psw = '#forgetPsw';
         this.initEvent();
         
          this.initCookie();
    }
    initEvent(){
        let self = this;
        $('.loginInput').focus(self.loginInputFocus.bind(self))
                       .focusout(self.loginInputFocusout.bind(self));
        $('#rememberPsw').on('click',self.rememberPsw.bind(self));
        $(self.login_btn).on('click',self.login.bind(self));
        $('body').on('keydown',self.keydown.bind(self));
        $(self.forget_psw).on('click',self.forgetPsw.bind(self));
    }

    initCookie(){
    
        let value = $.cookie('userPassword');
        $('#userPassword').val(value);

    };


    loginInputFocus(e){
        $(this).siblings('i').css('color','#2697F2')}

    loginInputFocusout(e){
        $(this).siblings('i').css('color','#a6a8ab')
    }


    rememberPsw(e){
        let status = $(this).attr('checked');
        if(status == 'checked'){
            $(this).attr('checked',false);

        }else{
            $(this).attr('checked',true)
        }
    }


    login(e){
        let self = this;

        if($('#login').valid()) {

            let value = $('#userPassword').val();

            self.ajax({
                method:'POST',
                url: Index.goaheadUrl+'login',
                data:{
                    'userPassword':'value'
                }}).then(function(result){
                    if(result != null && result != '' && result != ''){
                        let resultObj = JSON.parse(result);
                        if(resultObj.resultStatus == '00'){
                            if ($('#rememberPsw').attr('checked')) {

                                $.cookie('userPassword', value, {expires: 7});
                            }

                            window.location.href = '../main.html';

                        }else{
                            layer.msg('登录失败，请重试！',{
                                icon:2,
                                time:2000
                            })
                        }
                    }


                })
            }


        }
    

    keydown(e){
        if(e.keycode == '13'){
            $(this.login_btn).trigger('click');
        }
    }

    forgetPsw(e){
        this.alert('请联系管理员：1234-5678')
    }

}
const index  = new Index();