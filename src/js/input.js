function removeHasStatus(element) {
    var formGroupElement = element.parent();
    if (formGroupElement.hasClass("has-success")) {
        formGroupElement.removeClass("has-success");
    }
    if (formGroupElement.hasClass("has-error")) {
        formGroupElement.removeClass("has-error");
    }
}
function setHasError(element) {
    removeHasStatus(element);
    var formGroupElement = element.parent();
    formGroupElement.addClass("has-error");
}
function setHasSuccess(element) {
    removeHasStatus(element);
    var formGroupElement = element.parent();
    formGroupElement.addClass("has-success");
}

function setHasFeedback(element) {

    var formGroupElement = element.parent();

    if (!formGroupElement.hasClass("has-feedback")) {
        formGroupElement.addClass("has-feedback");
    }
}

function removeStatusSign(element) {
    if (element.next().length != 0 && element.next().hasClass("glyphicon")) {
        element.next().remove();
    }
}
function setSuccessSign(element) {

    setHasFeedback(element);
    removeStatusSign(element);
    element.after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
}
function setErrorSign(element) {

    setHasFeedback(element);
    removeStatusSign(element);
    element.after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
}

function removeHelpBlock(element) {
    var formGroupElement = element.parent();
    if (formGroupElement.find(":last-child").hasClass("help-block")) {
        formGroupElement.find(":last-child").remove();
    }
}
function setHelpBlock(element, text) {
    var formGroupElement = element.parent();
    removeHelpBlock(element);
    formGroupElement.find(":last-child").after('<span class="help-block">' + text + '</span>');
}

function setElementSuccess(element,successText){
    setSuccessSign(element);
    setHasSuccess(element);
    setHelpBlock(element,successText);
}

function setElementError(element, errorText){
    setErrorSign(element);
    setHasError(element);
    setHelpBlock(element,errorText);
}

function checkElement(element, reg, successText,errorText) {


    if (reg.test(element.val())) {
        setElementSuccess(element,successText);
        return true;
    }
    setElementError(element, errorText);
    return false;
}
