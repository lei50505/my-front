function logout(token){
    delCookie("token");
    delCookie(token);
}

function checkTokenAjaxFun(token) {
    $.ajax({
        url: "http://" + serviceHost + ":" + servicePort + "/my-feedback/user/token",
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "fb_user_token": token
        },
        beforeSend: function () {
        },
        success: function (data) {
            switch (data.code) {
                case 20000:
                    setCookie(token, true);
                    break;
                case 20001:
                    setCookie(token, false);
                    break;
            }
        },
        complete: function () {
        }
    });
}


function encodePsw(psw) {
    var md5Psw = md5(psw);
    for (var i = 0; i < 2; i++) {
        md5Psw = md5(md5Psw);
    }
    return md5Psw;
}