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


    var phoneElement = $("#fb-user-phone");

    function checkPhone() {
        var phoneReg = /^\d{11}$/;
        var successText = "电话号码格式正确";
        var errorText = "电话号码为11位数字";
        return checkElement(phoneElement, phoneReg, successText, errorText);

    }

    phoneElement.blur(checkPhone);

    var pswElement = $("#fb-user-password");

    function checkPsw() {
        var pswReg = /^\w{6,16}$/;
        var successText = "密码格式正确";
        var errorText = "密码应为6-16位";
        return checkElement(pswElement, pswReg, successText, errorText);
    }

    pswElement.blur(checkPsw);

    var savePswFlag = false;

    function loginAjaxFun() {
        $.ajax({
            url: "http://" + serviceHost + ":" + servicePort + "/my-feedback/user/login",
            type: "POST",
            dataType: "json",
            data: {
                "fb_user_phone": phoneElement.val(),
                "fb_user_password": encodePsw(pswElement.val())
            },
            beforeSend: function () {
                loginBtnElement.unbind("click");
                loginBtnElement.toggleClass("disabled");
            },
            success: function (data) {
                switch (data.code) {
                    case 20000:
                        if (savePswFlag) {

                            setStaffToken(data.data,7);
                        } else {
                            setStaffToken(data.data);
                        }
                        window.location.href = "staff-info.html";
                        return;
                    default :
                        alert(data.message);
                        return;
                }
            },
            complete: function () {
                loginBtnElement.toggleClass("disabled");
                loginBtnElement.click(loginBtnClickFun);
            }
        });
    }

    var saveElement = $("#fb-save");
    var loginBtnElement = $("#fb-login-btn");

    function loginBtnClickFun() {
        if (saveElement.prop("checked")) {
            savePswFlag = true;
        } else {
            savePswFlag = false;
        }
        var validFlag = true;
        if (!checkPhone()) {
            validFlag = false;
        }
        if (!checkPsw()) {
            validFlag = false;
        }
        if (validFlag == false) {
            return;
        }
        loginAjaxFun();
    }

    loginBtnElement.click(loginBtnClickFun);



});