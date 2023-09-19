var pages = {
    "Administrador": 'dashboard_admin.html',
    "Administrador del Cliente": 'dashboard_customer.html',
    "Residente": 'dashboard_resident.html',
    "Empleado": 'dashboard_employee.html'
}

var controller = function(server) {
    // Get a user by login
    var login = function(formId) {
        // Check if form is valid
        if (validForm(formId)) {
            var $form = $("#" + formId);
            // Serialize form in JSON object
            var credentials = getFormData($form);
            credentials.Password = btoa(credentials.Password);
            // Call API
            server.login(credentials, function(resp) {
                // Save user in local storage
                localStorage.setItem('auth', JSON.stringify(resp.token));
                localStorage.setItem('user', JSON.stringify(resp.user));
                // Close modal
                showNotificationSuccess('Que felicidad que estés de vuelta ' + resp.user.name);
                redirect(pages[resp.user.role]);
            }, function(err) {
                if (err.status == 404) {
                    showNotificationWarning('No se encontrá ningún usuario con esas credenciales');
                    console.log(err.responseText);
                } else if (err.status == 401) {
                    showNotificationWarning('No se encontrá ningún usuario con esas credenciales');
                    console.log(err.responseText);
                } else {
                    showNotificationError('Se presentó un error al intentar realizar el login.');
                    console.log(err.responseText);
                }
            });
        } else {
            showNotificationError('Campos requeridos sin completar en rojo');
        }
    }
    
    return {
        login: login,
    }
}(server);