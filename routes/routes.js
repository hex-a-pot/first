module.exports = function(app) {
    var mainc = require('../controller/main');
    //app.use(cors());
    app.get('/', mainc.mainfn);
    app.post('/login', mainc.login);
    //app.post('/signup', mainc.signup);
}