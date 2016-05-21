$(function(){
    (function(){
        var bossToken = getBossToken();
        var staffToken = getStaffToken();

        if(staffToken!=null){
            window.location.href="staff-info.html";
            return;
        }
        if(bossToken==null){
            window.location.href="boss-login.html";
            return;
        }
        $("#main").removeClass("invisible");
    })();
    $("#logout").click(function(){
        delToken();
        window.location.href="index.html";
    });
});

