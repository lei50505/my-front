$(function () {

    (function(){
        var bossToken = getBossToken();
        var staffToken = getStaffToken();

        if(bossToken!=null){
            window.location.href="boss-info.html";
            return;
        }
        if(staffToken!=null){
            window.location.href="staff-info.html";
            return;
        }
        $("#main").removeClass("invisible");
    })();

    var nameElement = $("#fb-shop-name");

    function checkName() {
        var reg = /.{1,30}/;
        var successText = "格式正确";
        var errorText = "餐厅名称应为1-30位";
        return checkElement(nameElement, reg, successText, errorText);
    }

    nameElement.blur(checkName);

    var phoneElement = $("#fb-shop-phone");

    function checkPhone() {
        var reg = /.{7,30}/;
        var successText = "格式正确";
        var errorText = "餐厅电话7-30位";
        return checkElement(phoneElement, reg, successText, errorText);
    }

    phoneElement.blur(checkPhone);

    var addressElement = $("#fb-shop-address");

    function checkAddress() {
        var reg = /.{3,200}/;
        var successText = "格式正确";
        var errorText = "餐厅地址3-200字";
        return checkElement(addressElement, reg, successText, errorText);
    }

    addressElement.blur(checkAddress);

    var signElement = $("#fb-sign");

    function checkSign() {
        var reg = /\d{6}/;
        var successText = "格式正确";
        var errorText = "验证码为6位数字";
        return checkElement(signElement, reg, successText, errorText);
    }

    signElement.blur(checkSign);

    var pswElement = $("#fb-shop-password");

    function checkPsw() {
        var reg = /^\w{6,16}$/;
        var successText = "格式正确";
        var errorText = "密码应为6-16位";
        return checkElement(pswElement, reg, successText, errorText);
    }

    pswElement.blur(checkPsw);

    var pswElement2 = $("#fb-shop-password2");

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
        return checkElement(pswElement2, reg, successText, errorText);

    }

    pswElement2.blur(checkPsw2);


    var emailInputElement = $("#fb-shop-email");

    function validEmailFormat() {
        var emailReg = /.+@.+\..+/;
        var successText = "邮箱格式正确";
        var errorText = "邮箱格式有误";
        return checkElement(emailInputElement, emailReg, successText, errorText);
    }

    var emailBtnElement = $("#fb-sign-btn");

    function emailBtnClickFun() {
        if (validEmailFormat()) {
            sendEmailSignAjax();
        }
    }

    function sendEmailSignAjax() {
        $.ajax({
            url: "http://" + serviceHost + ":" + servicePort + "/my-feedback/shop/email/sign",
            type: "POST",
            dataType: "json",
            data: {"fb_shop_email": emailInputElement.val()},
            beforeSend: function () {
                emailBtnElement.unbind("click");
                emailBtnElement.toggleClass("disabled");
                setTimeout(function () {
                    emailBtnElement.toggleClass("disabled");
                    emailBtnElement.val("点击获取验证码");
                    emailBtnElement.click(emailBtnClickFun);
                }, 10000);
            },
            success: function (data) {
                switch (data.code) {
                    case 20000:
                        emailBtnElement.val("发送成功，10秒后可以再次获取(" + data.data + ")");
                        return;
                    default :
                        setElementError(emailInputElement, data.message);
                        return;
                }
            },
            complete: function () {
            }
        });
    }

    emailBtnElement.click(emailBtnClickFun);
    emailInputElement.blur(function () {
        validEmailFormat();
    });


    var regBtn = $("#fb-reg-btn");

    function addShopAjax() {
        $.ajax({
            url: "http://" + serviceHost + ":" + servicePort + "/my-feedback/shop",
            type: "POST",
            dataType: "json",
            data: {
                "fb_shop_name": nameElement.val(),
                "fb_shop_phone": phoneElement.val(),
                "fb_shop_address": addressElement.val(),
                "fb_shop_email": emailInputElement.val(),
                "fb_shop_password": encodePsw(pswElement.val()),
                "fb_shop_sign": signElement.val()
            },
            beforeSend: function () {
                regBtn.unbind("click");
                regBtn.toggleClass("disabled");
            },
            success: function (data) {
                switch (data.code) {
                    case 20000:
                        window.location.href = "boss-login.html";
                        return;
                    default :
                        alert(data.message);
                        return;
                }
            },
            complete: function () {
                regBtn.click(regBtnClick);
                regBtn.toggleClass("disabled");
            }
        });
    }

    function regBtnClick() {
        var flag = 1;
        if (!checkName()) {
            flag = 0;
        }
        if (!checkPhone()) {
            flag = 0;
        }
        if (!checkAddress()) {
            flag = 0;
        }
        if (!validEmailFormat()) {
            flag = 0;
        }
        if (!checkSign()) {
            flag = 0;
        }
        if (!checkPsw()) {
            flag = 0;
        }
        if (!checkPsw2()) {
            flag = 0;
        }
        if (flag == 0) {
            return;
        }
        addShopAjax();
    }

    regBtn.click(regBtnClick);
});