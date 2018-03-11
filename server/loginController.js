var app = require('./index.js');

module.exports = {
    login: function (req, res) {
        const db = app.get('db');
        db.login()
            .then(user => {

            }).catch(err => { });
    },

    createAccount: (req, res) => {
        const db = app.get('db');
        db.createAccount()
            .then(user => {

            }).catch(err => { });
    },

    playAsGuest: (req, res) => {
        let username = req.body.guestUsername;
        req.session.username = '(guest) ' + username;
        return res.status(200).send('ok');
    },

};
