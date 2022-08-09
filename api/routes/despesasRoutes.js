const { Router } = require('express')

const DespesasController = require('../controllers/DespesasController')

const router = Router()

router.post('/despesas', DespesasController.criaDespesa)

router.get('/despesas', DespesasController.listaTodasAsDespesas)
router.get('/despesas/:id', DespesasController.pegaUmaDespesa)


router.get('/despesas/:ano/:mes', DespesasController.listaDespesasPorMes)




router.get('/despesasnome', DespesasController.teste)




router.put('/despesas/:id', DespesasController.atualizaDespesa)

router.delete('/despesas/:id', DespesasController.deletaDespesa)



module.exports = router