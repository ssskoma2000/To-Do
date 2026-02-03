const express = require('express')
const { checkToken } = require('../middleware/auth.middleware')
const route = express.Router()

const {
    CREATE,
    GET,
    GET_BY_ID,
    DELETE,
    UPDATE,
} = require('../controllers/subtask.controller')

route.get('/tasks/:taskId/subtasks', checkToken, GET)
route.get('/subtasks/:id', checkToken, GET_BY_ID)
route.post('/tasks/:taskId/subtasks', checkToken, CREATE)
route.put('/subtasks/:id', checkToken, UPDATE)
route.delete('/subtasks/:id', checkToken, DELETE)

module.exports = route
