$(function(){
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
});