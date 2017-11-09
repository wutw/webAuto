import $ from  './jquery-vendor.js';
window.jQuery = $;
import layer from 'layui-layer';
import   'jquery-validation';

// 手机号码验证
jQuery.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

//密码
jQuery.validator.addMethod("isPassword", function (value, element) {
    var length = value.length;
    var password = /^\w{6,20}$/;
    return this.optional(element) || (password.test(value));
}, "密码必须是(6-20)位字母、数字和下划线组合(不含空格)");

/*用户名*/
jQuery.validator.addMethod('isUserName', function (value, element) {
    var length = value.length;
    var userName = /^[a-zA-z][a-zA-Z0-9_]{3,20}$/;
    return this.optional(element) || (userName.test(value));
}, '用户名必须(4-20)位的字母、数字组合');

jQuery.validator.addMethod("isTemperature", function (value, element) {
    var temp = /^(\+|-)?([0-9]{1,3})(\.[0-9])?$/;
    return this.optional(element) || (temp.test(value));
}, "请输入合适的值(-999.9~999.9,保留一位小数)");

jQuery.validator.addMethod("setTemperature", function (value, element) {
    var temp = /^((300)|((1|2)?([0-9]{1,2})(\.[0-9])?))$/;
    return this.optional(element) || (temp.test(value));
}, "请输入合适的值(0-300,保留一位小数)");


jQuery.validator.addMethod("notEqualTo", function (value, element, param) {
    return value != $(param).val();
}, $.validator.format("MAC地址不能和终端标识相同"));


/*型号*/
jQuery.validator.addMethod("isModel", function (value, element) {

    var length = value.length;
    var model = /^[a-zA-Z0-9_-]+$/;
    return this.optional(element) || (model.test(value));
}, "型号必须是字母、数字、下划线和连接符");

/*name验证*/
jQuery.validator.addMethod('isName', function (value, element) {
    var length = value.length;
    var name = /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/;
    return this.optional(element) || (name.test(value));
}, "名称必须是中文，英文，数字");
/*特殊字符验证*/
jQuery.validator.addMethod("isContainsSpecialChar", function (value, element) {
    var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
    return this.optional(element) || !reg.test(value);
}, "不能含有空格等特殊字符!");

/*订单号验证*/
jQuery.validator.addMethod("isOrderId", function (value, element) {
    var orderId = /^[a-z0-9]+$/;
    return this.optional(element) || (orderId.test(value));
}, "只能是小写字母和数字");
/*时间大小*/
jQuery.validator.addMethod('greaterThan', function (value, element, param) {
    return value > $(param).val();
}, '上限必须大于下限！');
/*小数点后2位*/
jQuery.validator.addMethod('isMoney', function (value, element, param) {
    var money = /^\d{1,12}(?:\.\d{0,2})?$/g
    return this.optional(element) || (money.test(value));
}, '订单金额，小数点后1-2位！');
/*阈值上下限*//* /^(\+|-)?([0-9]{0,10})(\.[0-9]{0,2})?$/*/
jQuery.validator.addMethod("isBound", function (value, element) {
    var temp = /^(\+|-)?([0-9]{0,10}(\.[0-9]{0,6})?$)/;
    return this.optional(element) || (temp.test(value));
}, "(-9999999.99~9999999.99,保留6位小数)");
jQuery.validator.addMethod('smarterThan', function (value, element, param) {
    return value < $(param).val();
}, '下限必须小于上限！');
/*经纬度校验*/
jQuery.validator.addMethod('isLongitude', function (value, element, param) {
    var temp = /^(\+|-)?(((([1-9]?[0-9])|(1[0-7][0-9]))(\.[0-9]{0,6})?)|((180)(\.[0]{0,6})?))$/;
    return this.optional(element) || (temp.test(value));
}, '(-180.000000~180.000000,保留6位小数)")');
jQuery.validator.addMethod('isLatitude', function (value, element, param) {
    var temp = /^(\+|-)?((([1-8]?[0-9])(\.[0-9]{0,6})?)|((90)(\.[0]{0,6})?))$/;
    return this.optional(element) || (temp.test(value));
}, '(-90.000000~90.000000,保留6位小数)")');

//ip验证
jQuery.validator.addMethod('isIp', function (value, element, param) {
    var temp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    return this.optional(element) || (temp.test(value));
}, '格式：255.255.255.1');
/*端口校验 /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/*/
jQuery.validator.addMethod('isPort', function (value, element, param) {
    var temp = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
    return this.optional(element) || (temp.test(value));
}, '端口号：0-65535');

/*时间点校验*/
jQuery.validator.addMethod('isTimePoint', function (value, element, param) {
    var temp = /^([0-9]|[1-2][0-3])$/;
    return this.optional(element) || (temp.test(value));
}, '时间点：1-24');
/*设备标识校验*/
jQuery.validator.addMethod('isSensorNumber4', function (value, element, param) {
    var temp = /^[a-zA-Z0-9]{4}$/;
    return this.optional(element) || (temp.test(value));
}, '格式：4位英文，数字，及其组合');
jQuery.validator.addMethod('isSensorNumber6', function (value, element, param) {
    var temp = /^[a-zA-Z0-9]{6}$/;
    return this.optional(element) || (temp.test(value));
}, '格式：6位英文，数字，及其组合');
jQuery.validator.addMethod('isSensorNumber3', function (value, element, param) {
    var temp = /^[a-zA-Z0-9]{3}$/;
    return this.optional(element) || (temp.test(value));
}, '格式：3位英文，数字，及其组合');

jQuery.validator.addMethod('isNumber', function (value, element) {
    var temp = /^[0-9]{1,4}$/;
    return this.optional(element) || (temp.test(value));
}, '格式：1-4位数字');



export default function () {
    $('#login').validate({
        rules: {
            userPassword: {
                isPassword: true,
                required: true
            }

        },
        messages: {
            userPassword: {
                required: '请输入密码'
            }

        }
    });




    /*修改密码*/
    $('#modifyPassword').validate({
        rules: {

            oldPassword: {
                isPassword: true,
                required: true

            },
            newPassword: {
                required: true,
                isPassword: true
            },

            confirmPassword: {
                required: true,
                isPassword: true
            }

        },
        messages: {

            oldPassword: {
                required: '请输入密码'

            },
            newPassword: {
                required: '请输入密码'
            },

            confirmPassword: {
                required: '请输入密码'
            }

        }


    });

    $('#messageForm').validate({
        rules: {
            style: {
                required: true
            },
            terminalIpAddress:  {
                isIp:true,
                required: true
            },
            terminalPort: {
                isPort:true,
                required: true
            }

        },
        messages: {
            style: {
                required: '请输入协议类型'
            },
            terminalIpAddress:  {

                required: '请输入IP地址'
            },
            terminalPort: {

                required: '请输入端口号'
            }
        },
        errorPlacement:function(error,element){
            error.appendTo(element.parent());
        }
    });



    $('#transmissionForm').validate({

        rules: {
            lanSubMask: {
                isIp:true,
                required: true
            },
            lanMac: {
                required: true
            },
            lanIpAddress: {
                isIp:true,
                required: true
            }


        },
        messages: {
            lanSubMask: {

                required: '请输入子网掩码'
            },
            lanMac: {
                required: '请输入MAC'
            },
            lanIpAddress: {
                required: '请输入IP地址'
            }

        },
        errorPlacement:function(error,element){
            error.appendTo(element.parent());
        }

    });
    $('#sendMessage').validate({
        rules:{
            messageContent:{
                required:true,
                isContainsSpecialChar: true,
                rangelength: [0, 200]
            }
        },
        messages:{
            messageContent:{

                required:'请输入信息',
                rangelength: '长度在200个字符以内'

            }
        }
    })

};





