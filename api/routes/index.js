const bodyParser = require('body-parser')
const receitas = require('./receitasRoutes')
const despesas = require('./despesasRoutes')
const categorias = require('./categoriasRoutes')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(receitas)
    app.use(despesas)
    app.use(categorias)
}