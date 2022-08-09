const { Router } = require('express')

const ResumosController = require('../controllers/ResumosController')

const router = Router()

router.get('/resumo/:ano/:mes', ResumosController.resumo)




module.exports = router