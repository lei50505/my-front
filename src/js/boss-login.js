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
    var email = $("#email");

    function checkEmail() {
        var reg = /.+@.+\..+/;
        var successText = "格式正确";
        var errorText = "邮箱格式有误";
        return checkElement(email, reg, successText, errorText);
    }

    email.blur(checkEmail);

    var psw = $("#password");
    function checkPsw(){
        var reg = /\w{6,16}/;
        var successText = "格式正确";
        var errorText = "密码应为6-16位";
        return checkElement(psw, reg, successText, errorText);
    }
    psw.blur(checkPsw);

    var login = $("#login");
    function loginAjax(){
        $.ajax({
            url:"http://"+serviceHost+":"+servicePort+"/my-feedback/shop/login",
            type:"POST",
            dataType:"json",
            data:{
                fb_shop_email:email.val(),
                fb_shop_password:encodePsw(psw.val())
            },
            beforeSend:function(){
                login.unbind("click");
                login.val("请稍候...");
                login.toggleClass("disabled");
            },
            complete:function(){
                login.click(loginAjax);
                login.val("登录");
                login.toggleClass("disabled");
            },
            success:function(data){
                if(data.code!=20000){
                    alert(data.message);
                    return;
                }
                if(isSave){
                    setBossToken(data.data,7);
                }else{
                    setBossToken(data.data);
                }
                window.location.href="boss-info.html";
                return;
            }
        });
    }
    var isSave = false;
    login.click(function(){
        var flag=1;
        if(!checkPsw()){
            flag=0;
        }
        if(!checkEmail()){
            flag=0;
        }
        if(flag==0){
            return;
        }
        if($("#save").prop("checked")){
            isSave=true;
        }else{
            isSave=false;
        }
        loginAjax();
    });
});