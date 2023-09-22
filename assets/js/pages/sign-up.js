var controller = function(server) {
    // Get consumer data
    var register = function(formId) {
        // Check if form is valid
        if (validForm(formId)) {
            var $form = $("#" + formId);
            // Serialize form in JSON object
            var consumer = getFormData($form);
            consumer.IdentificationType = parseInt(consumer.IdentificationType);
            consumer.Password = btoa(consumer.Password);
            // Call API
            server.register(consumer, function(resp) {
                setTimeout(function() {
                    showNotificationSuccess('Le enviamos un correo electrónico al correo registrado para activar su cuenta en PropertyApp.');
                    redirect("sign-in.html");
                  }, 3000);
            }, function(err) {
                showNotificationError('Se presentó un error al intentar hacer el registro.');
                console.log(err.responseText);
            });
        } else {
            showNotificationError('Campos requeridos sin completar en rojo');
        }
    }
    return {
        register: register,
    }
}(server);