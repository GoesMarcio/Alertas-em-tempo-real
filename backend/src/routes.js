const express = require('express');
const SessionController = require('./controllers/SessionController');
const AlertController = require('./controllers/AlertController');

const routes = express.Router();

// GET, POST, PUT, DELETE

// req.query = Acessar query params (?idade=20)
// req.params = acessar route params (/:id)
// req.body = acessar corpo de post json

routes.get('/', (req, res) => {
	return res.json({end:"ffpapa"});
});


routes.post('/createUser', SessionController.store);
routes.post('/sessions', SessionController.show);
routes.get('/user', SessionController.show2);
routes.post('/alert', AlertController.store);
routes.get('/alert', AlertController.index);
routes.get('/allAlerts', AlertController.index2);

module.exports = routes;