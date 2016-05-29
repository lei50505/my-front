$(function(){
    (function(){
        bossTokenIsNull();
        staffTokenNotNull();
        $("#main").removeClass("invisible");
    })();
    $("#logout").click(function(){
        logout();
    });



    function getStaffInfo() {
        staffTokenNotNull();
        $.ajax({
            url: "http://" + serviceHost + ":" + servicePort + "/my-feedback/user/info",
            type: "POST",
            dataType: "json",
            data: {
                "fb_user_token": getStaffToken()
            },
            beforeSend: function () {
            },
            success: function (data) {
                switch (data.code) {
                    case 20000:
                        var user = data.data;
                        $("#name").html(user.fb_user_name);
                        $("#phone").html(user.fb_user_phone);
                        return;
                    case 40028:
                    case 40027:
                        staffLogin();
                        return;
                    default :
                        alert(data.message);
                        return;
                }
            },
            complete: function () {
            }
        });
    }
    getStaffInfo();
});
