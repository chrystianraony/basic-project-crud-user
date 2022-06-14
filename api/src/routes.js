const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const CargoController = require('./controllers/CargoController')

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.get('/users/:id', UserController.get)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.get('/cargos', CargoController.index)
routes.post('/cargos', CargoController.create)
routes.get('/cargos/:id', CargoController.get)
routes.put('/cargos/:id', CargoController.update)
routes.delete('/cargos/:id', CargoController.delete)



module.exports = routes