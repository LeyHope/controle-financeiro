const { Router } = require('express')
const ReceitasController = require('../controllers/ReceitasController.js')


const router = Router()


router.post('/receitas', ReceitasController.registraReceita)


router.get('/receitas', ReceitasController.listaTodasAsReceitas)
router.get('/receitas/:id', ReceitasController.pegaUmaReceita)




router.put('/receitas/:id', ReceitasController.atualizaReceita)

router.delete('/receitas/:id', ReceitasController.deletaReceita)




module.exports = router