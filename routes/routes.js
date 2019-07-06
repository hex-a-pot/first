module.exports = function(app) {
    var mainc = require('../controller/main');
    app.get('/', mainc.mainfn);
    app.post('/login', mainc.login);
    app.post('/signup', mainc.signup);
    app.get('/create-user-password', mainc.createUserPassword);
    app.post('/savePassword', mainc.savePassword);
}