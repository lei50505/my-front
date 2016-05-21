$(function(){
    (function(){
        var bossToken = getBossToken();
        var staffToken = getStaffToken();

        if(bossToken!=null){
            window.location.href="boss-info.html";
            return;
        }
        if(staffToken==null){
            window.location.href="staff-login.html";
            return;
        }

        $("#main").removeClass("invisible");
    })();
    $("#logout").click(function(){
        delToken();
        window.location.href="index.html";
    });
});
