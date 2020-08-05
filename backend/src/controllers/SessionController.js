const User = require('../models/User');

// index, show, store, update, destroy

module.exports = {
    async store(req, res){
        const name = req.body.name;
        const email = req.body.email;
        const login = req.body.login;
        const password = req.body.password;

        let user = await User.findOne({email});
        
        if(!user) user = await User.create({name, email, login, password});

        return res.json(user);
    },

    async show(req, res){
        const login = req.body.login;
        const password = req.body.password;

        let user = await User.findOne({login, password});
        
        //if(!user) user = await User.create({name, email, login, password});

        return res.json(user);
    },

    async show2(req, res){
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        return res.json(user);
    }
};