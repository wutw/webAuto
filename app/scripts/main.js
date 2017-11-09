import $ from  './jquery-vendor.js';

import   'jquery.cookie';
import layer from 'layui-layer';
import   './validate.js';
import   'jquery-validation';
import 'babel-polyfill';
import Height from './common/height.js';
import Ajax from './common/ajax.js';
import CurrentDate from './common/date.js';
import mix from './common/mixClass.js';
import  CommonEvent from './common/commonEvent.js';
import Layer from './common/layer.js';
class Main extends mix(Height,Ajax,CommonEvent,Layer){
    constructor(index = -1){
        super();
        this.initEvent();
        this.global_load_index = index;
    }
    initEvent(){
        let self = this;
        $('#refresh').on('click',self.refresh.bind(self));
        $('#modifyPsw').on('click',self.modifyPsw.bind(self));
        $(window).bind('resize',self.resize.bind(self));
        $('.navbarSide').on('click',self.navbarSide.bind(self));
        $('.tree-navbar').on('click','li',self.aside.bind(self));
    }


    refresh(e){
        let self = this;
        self.confirm('终端重启？',{title:'确认框'},
            (index)=> {
                    self.ajax({
                        method: 'POST',
                        url:Main.goaheadUrl+'restart',
                        data: {
                            'type':'00'
                        }}).then(function (result) {

                            $.cookie('userPassword', '');
                            window.location.href = '../index.html';
                            layer.close(index);

                        })
                        
                    })
    }


    //修改密码
    modifyPsw(e){
        let self = this;

        $('.password').val('');
        $('.error').empty();

        layer.open({
            type: 1,
            title: '修改密码',
            area: 'auto',
            shade: [0.8, '#fafafa'],
            shadeClose: false,
            content: $('#modifyPassword'),
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                if ($('#modifyPassword').valid()) {

                    let sendData = {
                        'oldPassword':'',
                        'newPassword':'',
                        'confirmPassword':''
                    };
                    sendData.oldPassword = $('#oldPassword').val();
                    sendData.newPassword = $('#newPassword').val();
                    sendData.confirmPassword = $('#confirmPassword').val();

                    if( sendData.newPassword ==  sendData.confirmPassword ){
                        eye.ajax({
                            method:'POST',
                            url:goaheadUrl+'removePassword',
                            data:sendData
                            }).then((result)=>{
                               layer.msg('修改成功',{
                                   icon:1,
                                   time:2000
                               });
                                layer.close(index);

                            })
                        }

                    else{
                        layer.msg('修改密码不一致',{
                            icon:2,
                            time:2000
                        })
                    }



                }
            }
        })

    }

//子导航栏与导航栏切换
    resize(){
        let page = {
            w:'',
            h:''
        };
        page.w = $(window).width();
        page.h = $(window).height();
        if(page.w < 880){
            $('.tree-navbar').hide(100);
            setTimeout(function(){$('.navbarSide').fadeIn(300)},100);

        }
        else{

            $('.navbarSide').hide(100);

            setTimeout( function(){$('.tree-navbar').fadeIn(300)}, 100);

        }

    }

    navbarSide(){

        $('.navbarSide').hide(100);
        setTimeout( function(){$('.tree-navbar').fadeIn(300)}, 100);



    }

    aside(e) {
        let self = this;
        let target = e.currentTarget;

        $(target).addClass('active').siblings('li').removeClass('active');

        let dataUrl = $(target).children('a').attr('href'),
            dataIndex = $(target).children('a').attr('data-index');

        if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;


        // 添加选项卡对应的iframe
        let str1 = `<iframe class='J_iframe' name='iframe ${dataIndex}' width='100%' height='100%' src = '${dataUrl}' frameborder="0" data-id= '${dataUrl}' seamless></iframe>`;
 
        $('#right-container ').append(str1).show();
        $('#right-container .J_iframe:eq(0)').remove();

        self.loading();

        $('#right-container iframe').on('load',function () {
            //iframe加载完成后隐藏loading提示
           self.closeLoading();

        });

        return false;//不return false就会跳转到子页面

    }

}
let main = new Main();