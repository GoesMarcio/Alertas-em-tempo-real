const User = require('../models/User');
const Alert = require('../models/Alert');

module.exports = {
    async index(req, res){
        const time = Math.round(new Date().getTime() / 1000) - 10;
        const alert = await Alert.find().where('date').gt(time);
        ret = new Object();
        ret['time'] =  time;
        ret["alerts"] = alert;
        ret["count"] = alert.length;

        return res.json(ret);
    },

    async index2(req, res){
        
        const alert = await Alert.find().sort({date: -1});
        ret = new Object();
        ret["alerts"] = alert;
        ret["count"] = alert.length;

        return res.json(ret);
    },

    async store(req, res){
        //const title = req.body.name;
        //const text = req.body.email;
        //const type = req.body.type;
        const { title, text, type } = req.body;
        const { user_id } = req.headers;
        let time = Math.round(new Date().getTime() / 1000);

        const user = await User.findById(user_id);

        if(!user) return res.status(400).json({error: "Usuário não existe!"});

        const alert = await Alert.create({
            title: title,
            text: text,
            type: type,
            date: time,
            user: user_id
        });

        return res.json(alert);
    }
};