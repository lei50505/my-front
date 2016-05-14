/**
 * Created by CAOLEI on 2016/4/29.
 */
$(function () {

    var my_phone_element = $("#my-phone");
    my_phone_element.css("ime-mode", "disabled");

    var my_phone_form_group_element = my_phone_element.parent();

    function valid_phone_number(phone_number) {
        var phone_reg = /^\d{11}$/;
        return phone_reg.test(phone_number);
    }

    function remove_form_froup_has_status(form_group_element) {
        if (form_group_element.hasClass("has-success")) {
            form_group_element.removeClass("has-success");
        }
        if (form_group_element.hasClass("has-warning")) {
            form_group_element.removeClass("has-warning");
        }
        if (form_group_element.hasClass("has-error")) {
            form_group_element.removeClass("has-error");
        }
    }

    function set_form_group_has_error(form_group_element) {
        remove_form_froup_has_status(form_group_element);
        form_group_element.addClass("has-error");
    }

    function set_form_group_has_success(form_group_element) {
        remove_form_froup_has_status(form_group_element);
        form_group_element.addClass("has-success");
    }

    function set_form_group_has_warning(form_group_element) {
        remove_form_froup_has_status(form_group_element);
        form_group_element.addClass("has-warning");
    }

    function remove_status_sign(input_element) {
        if (input_element.next().length != 0 && input_element.next().hasClass("glyphicon")) {
            input_element.next().remove();
        }
    }

    function set_form_group_has_feedback(form_group_element) {
        if (!form_group_element.hasClass("has-feedback")) {
            form_group_element.addClass("has-feedback");
        }
    }

    function add_success_sign(input_element) {
        set_form_group_has_feedback(input_element.parent());
        remove_status_sign(input_element);
        input_element.after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
    }

    function add_error_sign(input_element) {
        set_form_group_has_feedback(input_element.parent());
        remove_status_sign(input_element);
        input_element.after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
    }

    function add_warn_sign(input_element) {
        set_form_group_has_feedback(input_element.parent());
        remove_status_sign(input_element);
        input_element.after('<span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>');
    }

    function remove_help_block(form_group_element) {
        if (form_group_element.find(":last-child").hasClass("help-block")) {
            form_group_element.find(":last-child").remove();
        }
    }

    function add_help_block(form_group_element, text) {
        remove_help_block(form_group_element);
        form_group_element.find(":last-child").after('<span class="help-block">' + text + '</span>');
        ;
    }

    function valid_my_phone_number() {
        return valid_phone_number(my_phone_element.val());
    }

    my_phone_element.blur(function () {
        if (valid_my_phone_number()) {
            add_success_sign(my_phone_element);
            set_form_group_has_success(my_phone_form_group_element);
            remove_help_block(my_phone_form_group_element);
            return;
        }
        add_error_sign(my_phone_element);
        set_form_group_has_error(my_phone_form_group_element);
        add_help_block(my_phone_form_group_element, "电话号码应为11位数字");
        $.ajax({
            url: "http://23.83.255.184:8080/my-feedback/isExistPhone.do",
            type: "GET",
            dataType: 'json',
            data: {"phone": "15326761239"},
            success: function (data) {
                alert(data.httpstatus);
            }
        });
    });
});