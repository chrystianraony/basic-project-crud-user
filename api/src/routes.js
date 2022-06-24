const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const CargoController = require('./controllers/CargoController')
const PacienteController = require('./controllers/PacienteController')
const MedicosController = require('./controllers/MedicosController')

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

routes.get('/pacientes', PacienteController.index)
routes.post('/pacientes', PacienteController.create)
routes.get('/pacientes/:id', PacienteController.get)
// routes.put('/pacientes/:id', PacienteController.update)
routes.delete('/pacientes/:id', PacienteController.delete)

routes.get('/medicos', MedicosController.index)
routes.post('/medicos', MedicosController.create)
routes.get('/medicos/:id', MedicosController.get)
routes.put('/medicos/:id', MedicosController.update)
routes.delete('/medicos/:id', MedicosController.delete)



module.exports = routes