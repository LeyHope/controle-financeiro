const { Router } = require('express')
const ReceitasController = require('../controllers/ReceitasController.js')


const router = Router()


router.post('/receita', ReceitasController.registraReceita)

router.get('/receitaid', ReceitasController.pegaUmaReceita)


module.exports = router