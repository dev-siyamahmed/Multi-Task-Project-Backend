const express = require('express')
const subcriptionController = require('../../controllers/subcription.controller')

const subcriptionRoutes = express.Router()

subcriptionRoutes.post('/create', subcriptionController.createSubcription)
subcriptionRoutes.get('/all', subcriptionController.getSubcriptions)
subcriptionRoutes.get('/:id', subcriptionController.getSubcription)
subcriptionRoutes.put('/:id' , subcriptionController.updateSubcription)
subcriptionRoutes.delete('/:id' , subcriptionController.deleteSubcription)
module.exports = subcriptionRoutes
