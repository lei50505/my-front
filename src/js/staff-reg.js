$(function () {

    var nameElement = $("#fb-user-name");

    function checkName() {
        var reg = /^.{2,10}$/;
        var successText = "格式正确";
        var errorText = "姓名应为2-10位";
        return checkElement(nameElement, reg, successText, errorText);
    }

    nameElement.blur(checkName);

    var pswElement = $("#fb-user-password");

    function checkPsw() {
        var reg = /^\w{6,16}$/;
        var successText = "格式正确";
        var errorText = "密码应为6-16位";
        return checkElement(pswElement, reg, successText, errorText);
    }

    pswElement.blur(checkPsw);

    var pswElement2 = $("#fb-user-password2");

    function checkPsw2() {
        var reg = /^\w{6,16}$/;
        var successText = "格式正确";
        var errorText = "密码应为6-16位";

        if (!checkElement(pswElement2, reg, successText, errorText)) {
            return false;
        }

        reg = new RegExp("^" + pswElement.val() + "$");
        successText = "格式正确";
        errorText = "两次密码应相同";
        return  checkElement(pswElement2, reg, successText, errorText);

    }

    var phoneElement = $("#fb-user-phone");
    function validPhoneFormat(){
        var reg = /^\d{11}$/;
        var successText = "手机号码格式正确";
        var errorText = "手机号码应为11位数字";
        return checkElement(phoneElement, reg, successText, errorText);
    }

    function checkPhoneAjax(){
        $.ajax({
            url: "http://" + serviceHost + ":" + servicePort + "/my-feedback/user/phone/exist/" + phoneElement.val(),
            type: "GET",
            dataType: "json",
            data: null,
            async:true,
            beforeSend: function () {
            },
            success: function (data) {
                switch (data.code) {
                    case 20000:
                        if(data.data){
                            setElementError(phoneElement,"手机号码已存在");
                            return;
                        }
                        setElementSuccess(phoneElement,"手机号码可用");
                        return;
                    default :
                        setElementError(phoneElement,"服务器异常");
                        return;
                }
            },
            complete: function () {
            }
        });
    }
    phoneElement.blur(function(){
        if(validPhoneFormat()){
            checkPhoneAjax();
        }
    });



    pswElement2.blur(checkPsw2);

    var validPhone={};

    function phoneAjax(){
        var reg = /^\d{11}$/;
        var successText = "格式正确";
        var errorText = "手机号码应为11位数字";
        if( !checkElement(phoneElement, reg, successText, errorText)){
            validPhone[phoneElement.val()]=1;
            return;
        }
        $.ajax({
            url: "http://" + serviceHost + ":" + servicePort + "/my-feedback/user/phone/exist/" + phoneElement.val(),
            type: "GET",
            dataType: "json",
            data: null,
            async:false,
            beforeSend: function () {
            },
            success: function (data) {
                switch (data.code) {
                    case 20000:
                        if(data.data){
                            setElementError(phoneElement,"电话号码已存在");
                            validPhone[phoneElement.val()]=2;
                            return;
                        }
                        setElementSuccess(phoneElement,"格式正确");
                        validPhone[phoneElement.val()]=0;
                        return;
                    default :
                        setElementError(phoneElement,"服务器异常");
                        validPhone[phoneElement.val()]=3;
                        return;
                }
            },
            complete: function () {
            }
        });
    }



    var signElement = $("#fb-sign");

    function checkSign() {
        var reg = /^\d{6}$/;
        var successText = "格式正确";
        var errorText = "验证码为6位数字";
        return checkElement(signElement, reg, successText, errorText);
    }

    signElement.blur(checkSign);

    var signBtn = $("#fb-sign-btn");

    function signBtnClickFun() {
        if (!validPhoneFormat()) {
            return;
        }
        $.ajax({
            url: "http://" + serviceHost + ":" + servicePort + "/my-feedback/user/sign/" + $("#fb-user-phone").val(),
            type: "GET",
            dataType: "json",
            data: null,
            beforeSend: function () {
                signBtn.unbind("click");
                signBtn.toggleClass("disabled");
                signBtn.val("发送成功，10秒后可以再次获取");
                setTimeout(function(){
                    signBtn.toggleClass("disabled");
                    signBtn.val("点击获取验证码");
                    signBtn.click(signBtnClickFun);
                }, 10000);
            },
            success: function (data) {
                switch (data.code) {
                    case 20000:
                        signBtn.val("发送成功，10秒后可以再次获取(" + data.data + ")");
                        return;
                    default :
                        setElementError(phoneElement,data.message);
                        return;
                }
            },
            complete: function () {
            }
        });
    }
    signBtn.click(signBtnClickFun);


    var regBtn = $("#fb-reg-btn");

    function validParamFormat() {
        var flag = 1;
        if (!checkName()) {
            flag = 0;
        }
        if (!checkPsw()) {
            flag = 0;
        }
        if (!checkPsw2()) {
            flag = 0;
        }
        if (!validPhoneFormat()) {
            flag = 0;
        }
        if (!checkSign()) {
            flag = 0;
        }
        return flag == 1;
    }

    function regBtnClickFun() {
        if (!validParamFormat()) {
            return;
        }
        var rawPsw = pswElement.val();
        var md5Psw = encodePsw(rawPsw);

        var regData = {
            "fb_user_name": nameElement.val(),
            "fb_user_password": md5Psw,
            "fb_user_phone": phoneElement.val(),
            "fb_sign":signElement.val()
        };
        $.ajax({
            url: "http://" + serviceHost + ":" + servicePort + "/my-feedback/user",
            type: "POST",
            dataType: "json",
            data: regData,
            beforeSend: function () {
                regBtn.toggleClass("disabled");
                regBtn.unbind("click");
                regBtn.val("请稍候");
            },
            success: function (data) {
                switch (data.code){
                    case 20000:
                        window.location.href="staff-login.html";
                        return;
                    default :
                        alert(data.message);
                        return;
                }
            },
            complete: function () {
                regBtn.toggleClass("disabled");
                regBtn.click(regBtnClickFun);
                regBtn.val("注册");
            }
        });
    }
    regBtn.click(regBtnClickFun);
});