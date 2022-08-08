const { Router } = require('express')
const router = Router()

const CategoriasControlle = require('../controllers/CategoriasController')


router.post('/categorias', CategoriasControlle.criaCategoria)


module.exports = router