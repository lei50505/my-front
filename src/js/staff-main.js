$(function () {
    (function () {
        var token = getCookie("staff-token");
        if (token == null || token == "") {
            window.location.href = "staff-login.html";
            return;
        }
        //$("#fb-main").removeClass("invisible");
    })();
    $("#fb-logout").click(function(){
        delCookie("staff-token");
        window.location.href="index.html";
    });
});