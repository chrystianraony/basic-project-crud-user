const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.get('/users/:id', UserController.get)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)




module.exports = routes