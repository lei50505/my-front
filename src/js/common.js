var serviceHost = "ti19.com";
var servicePort = 8080;
function encodePsw(psw) {
    var md5Psw = md5(psw);
    for (var i = 0; i < 2; i++) {
        md5Psw = md5(md5Psw);
    }
    return md5Psw;
}
function setBossToken(token, days) {
    delCookie("staff-token");
    switch (arguments.length) {
        case 1:
            setCookie("boss-token",token);
            break;
        case 2:
            setCookieExprDays("boss-token",token,days);
            break;
    }
}
function setStaffToken(token,days) {
    delCookie("boss-token");
    switch (arguments.length) {
        case 1:
            setCookie("staff-token",token);
            break;
        case 2:
            setCookieExprDays("staff-token",token,days);
            break;
    }
}
function staffLogin(){
    delToken();
    window.location.href="staff-login.html";
}
function delToken(){
    delCookie("staff-token");
    delCookie("boss-token");
}
function logout(){
    delToken();
    window.location.href="index.html";
}
function getBossToken() {
    return getCookie("boss-token");
}
function getStaffToken() {
    return getCookie("staff-token");
}
function staffTokenNotNull(){
    if(getStaffToken()==null){
        window.location.href="staff-login.html";
        return;
    }
}
function bossTokenIsNull(){
    if(getBossToken()!=null){
        window.location.href="boss-info.html";
        return;
    }
}
function setCookieExprMs(key, value, exprMs) {
    var cookieStr = key + "=" + encodeURIComponent(value);
    var date = new Date();
    date.setTime(date.getTime() + exprMs);
    cookieStr += "; expires=" + date.toUTCString();
    document.cookie = cookieStr;
}
function setCookie(key, value) {
    var cookieStr = key + "=" + encodeURIComponent(value);
    document.cookie = cookieStr;
}
function setCookieExprDays(key, value, exprDays) {
    setCookieExprMs(key, value, exprDays * 24 * 60 * 60 * 1000);
}
function getCookie(key) {
    if (document.cookie.length > 0) {
        var cookieStrArray = document.cookie.split("; ");
        for (var i = 0; i < cookieStrArray.length; i++) {
            var cookieArray = cookieStrArray[i].split("=");
            if (cookieArray[0] == key) {
                return decodeURIComponent(cookieArray[1]);
            }
        }
    }
    return null;
}
function delCookie(key) {
    setCookieExprMs(key, null, 0);
}