const Status = {
    Active: 1,
    Completed: 2,
    Done: 3,
    Deleted: 4,
    TimedOut: 5,
}

const Roles = {
    Admin: 0,
    SupportAdmin: 1,
    Agency: 2,
    User: 3
}

var rolesDescription = ['Administrador', 'Administrador de soporte', 'Agencia', 'Usuario'];
var statusDescription = ['', 'Open', 'Completed', 'Done', 'Deleted', 'Timed Out']

function cleanElement(id) {
    document.getElementById(id).innerHTML = "";
}

function setValueElement(id, value) {
    cleanElement(id);
    $(`#${id}`).append(value);
}

function redirect(page) {
    setTimeout(() => {
        window.location.replace(page);
    }, 2000);
}

function showLoader(opc) {
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    if (opc) 
        document.getElementById("loadingDiv").style.zIndex = "10000";
}

function hideLoader() {
    removeLoader();
}

function removeLoader() {
    $("#loadingDiv").fadeOut(500, function() {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight 
    });
}

// Log out the user
function logout() {
    var obj = localStorage.getItem('user');
    if (obj) {
        user = JSON.parse(obj);
        showNotificationWarning('Chao ' + user.name + ' nos vemos luego')
    }
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    redirect("pages-login.html");
}

// Function to serialize a form in JSON object
function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function(n, i) {
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
}

// Function to valid a form
function validForm(formId) {
    var res = true
    $("form#" + formId + " :input").each(function() {
        var input = $(this)[0];
        if (input.required) {
            switch (input.type) {
                case "tel":
                case "text":
                case "email":
                case "number":
                case "password":
                case "date":
                case "datetime":
                case "datetime-local":
                    if (input.value == "") {
                        if (!input.classList.contains("invalid")) {
                            input.className += " invalid";
                        }
                        res = false;
                    } else
                        input.className = input.className.replace(" invalid", "")
                    break;
                case "checkbox":
                    if (!input.checked) {
                        if (input.labels.length > 0) {
                            if (!input.labels[0].classList.contains("invalid")) {
                                input.labels[0].className += " invalid";
                            }
                            res = false;
                        }
                    } else {
                        if (input.labels.length > 0)
                            input.labels[0].className = input.labels[0].className.replace(" invalid", "")
                    }
                    break;
                case "select-one":
                    if (input.selectedIndex == 0) {
                        if (!input.classList.contains("invalid")) {
                            $('#' + input.id).addClass('invalid');
                        }
                        res = false;
                    } else {
                        input.className = input.className.replace(" invalid", "")
                    }
                    break;
                default:
                    break;
            }
        }
    });
    $("form#" + formId + " select").each(function() {
        var input = $(this)[0];
        if (input.required) {
            if (input.value == '') {
                if (!input.classList.contains("invalid")) {
                    input.className += " invalid";
                }
                res = false;
            } else {
                input.className = input.className.replace(" invalid", "")
            }
        }
    });
    $("form#" + formId + " textarea").each(function() {
        var input = $(this)[0];
        if (input.required) {
            if (input.value == '') {
                if (!input.classList.contains("invalid")) {
                    input.className += " invalid";
                }
                res = false;
            } else {
                input.className = input.className.replace(" invalid", "")
            }
        }
    });
    setTimeout(() => {
        $('.invalid').each((index, element) => {
            element.classList.remove("invalid");
        });
    }, "2000");
    return res;
}

// Function to show a success notification
function showNotificationSuccess(msg) {
    $.notify({
        message: msg

    }, {
        type: 'success',
        timer: 4000,
        placement: {
            from: 'bottom',
            align: 'right'
        },
        allow_dismiss: false,

    });
}

// Function to show a warning notification
function showNotificationWarning(msg) {
    $.notify({
        message: msg

    }, {
        type: 'warning',
        timer: 4000,
        placement: {
            from: 'bottom',
            align: 'right'
        },
        allow_dismiss: false,
    });
}

// Function to show a error notification
function showNotificationError(msg) {
    $.notify({
        message: msg

    }, {
        type: 'danger',
        timer: 4000,
        placement: {
            from: 'bottom',
            align: 'right'
        },
        allow_dismiss: false,
    });
}