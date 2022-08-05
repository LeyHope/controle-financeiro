const { Router } = require('express')

const DespesasController = require('../controllers/DespesasController')

const router = Router()

router.post('/despesas', DespesasController.criaDespesa)

router.delete('/despesas/:id', DespesasController.apagaDespesa)



module.exports = router