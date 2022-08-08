const database = require('../models')
const { Op } = require('sequelize')

class CategoriasControlle {

    static async criaCategoria(req, res) {
        const {nome_categoria} = req.body

        try {

            const categoria = {
                nome_categoria
            }

            await database.Categorias.create(categoria)

            res.status(201).json(`Ok`)

        } catch (erro) {
            res.status(400).json(erro.message)
        }

    }

}

module.exports = CategoriasControlle