var app = require('./index.js');

module.exports = {

    login: function (req, res) {
        const db = app.get('db');
        let {username, password} = req.body;

        if (!username || !password){
            return res.status(200).send('error, no username/password');
        }

        db.login([username, password])
            .then(user => {
                if (!user[0]){
                    return res.status(200).send('no user found with that username/password');
                }else if (user[0]){
                    req.session.username = user[0].username
                    return res.status(200).send('ok');
                }
            }).catch(err => { });
    },

    createAccount: (req, res) => {
        const db = app.get('db');
        let {newUsername, newPassword} = req.body;

        if (!newUsername || !newPassword){
            return res.status(200).send('error, no username/password');
        }

        db.checkDuplicateUsername([newUsername])
        .then( existingUser => {
            if (existingUser[0]){
                return res.status(200).send('error. username is taken');
            }else{
                db.createAccount([newUsername, newPassword])
                    .then(user => {
                        req.session.username = newUsername;
                        return res.status(200).send('ok');
                    }).catch(err => { });
            }
        })
    },

    playAsGuest: (req, res) => {
        let username = req.body.guestUsername;
        req.session.username = '(guest) ' + username;
        return res.status(200).send('ok');
    },

};
