var APIurl = "http://localhost:5005/";

var server = function() {

    var login = function(obj, done, fail) {
        // Login user with credentials
        return $.ajax({
            url: APIurl + 'Users/login',
            type: 'POST',
            timeout: 0,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(obj),
        }).done(done).fail(fail)
    }

    var register = function(obj, done, fail) {
        // Create a new user
        return $.ajax({
            url: APIurl + 'Users',
            type: 'POST',
            timeout: 0,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(obj),
        }).done(done).fail(fail)
    }

    var getUser = function(id, done, fail) {
        // Get user by id
        return $.ajax({
            url: APIurl + 'Users/' + id,
            type: 'GET',
            timeout: 0,
            headers: { "Content-Type": "application/json", "Authorization": addToken() },
        }).done(done).fail(fail)
    }

    var tokenIsValid = function(id, done, fail) {
        // Get user by id
        return $.ajax({
            url: APIurl + 'Users/' + id + '/isvalid',
            type: 'GET',
            timeout: 0,
            headers: { "Content-Type": "application/json", "Authorization": addToken() },
        }).done(done).fail(fail)
    }

    var saveProcess = function(obj, done, fail) {
        // Create a new user
        return $.ajax({
            url: APIurl + 'Process',
            type: 'POST',
            timeout: 0,
            headers: { "Content-Type": "application/json", "Authorization": addToken() },
            data: JSON.stringify(obj),
        }).done(done).fail(fail)
    }

    return {
        login: login,
        getUser: getUser,
        register: register,
        saveProcess: saveProcess,
        tokenIsValid: tokenIsValid,
    }
}()

function addToken() {
    return 'Bearer ' + JSON.parse(localStorage.getItem('auth'));
}