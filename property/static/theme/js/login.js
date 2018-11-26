function validate_login_form(){
    let email_regex = new RegExp(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/);
    let has_error = false;
    let email_el =  $("#id_username");
    let password =  $("#id_password");
    if(!email_el.val()){
        // no value
        has_error = true;
        email_el.animateCss("shake");
    }
    else if(!email_regex.test(email_el.val())){
        // regex fail
        has_error = true;
        email_el.animateCss("shake");
    }
    else if(!password.val()){
        has_error = true;
        password.val("").animateCss("shake");
    }
    return has_error
}

function login() {
    // loading on login button

    const body = {
        "email": $("#id_username").val(),
        "password": $("#id_password").val(),
    };
    let settings = {
        url: '/login/',
        data: body,
        "success": function (response) {
            if(!response.status) {
                $("#email-error").attr("hidden", "hidden");
                $("#login-error").text(response.message);
            }
            else{
                window.location = "/home/"
            }
            $("#login_submit").attr("hidden", "hidden");
            $("#login_btn").removeAttr("hidden");
            show_notification("success", "Login Successful!");
        },
        "error": function () {
            show_notification("danger", "Something goes wrong. Please contact to admin");
        }};
        if(!validate_login_form()) {
            $("#login_btn").attr("hidden", "hidden");
            $("#login_submit").removeAttr("hidden");
            $.post(settings)
        }
        else{
            if ($("#id_username").val() && $("#id_password").val()){
                $("#email-error").removeAttr("hidden");
            }
            else{
                $("#email-error").attr("hidden", "hidden");
            }
        }
}