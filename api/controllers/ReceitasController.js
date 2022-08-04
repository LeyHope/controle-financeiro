const database = require('../models/index')

class ReceitasController {

    static async registraReceita(req, res) {
        const {descricao, valor, data} = req.body

        const dataModificar = data
        console.log(dataModificar)
        console.log(typeof(dataModificar))


        if(!descricao) {
            return res.status(400).json({msg: 'A descrição é obrigatória'})
        }

        const busca = await database.Receitas.findOne({descricao:descricao})

        // if(busca) {
        //     return res.status(400).json({msg: 'Descrição já cadastrada'})
        // }

        if(!valor) {
            return res.status(400).json({msg: 'O valor é obrigatória'})
        }

        if(!data) {
            return res.status(400).json({msg: 'A data é obrigatória'})
        }

        const receita = {
            descricao, 
            valor, 
            data
        }

        try {
            const receitaCriada = await database.Receitas.create(receita)

            res.status(201).json(`Receita cadastrada!`)

        } catch (erro) {

            res.status(400).json()

        }
    }


    static async pegaUmaReceita (req, res) {
        const {id} = req.body

        try {

            const consulta = await database.Receitas.findByPk(id)
            console.log(consulta.data)
            console.log(typeof(consulta.data))

            if(!consulta) {
                return res.status(400).json("Id não existente")
            }

            return res.status(200).json(consulta)
        
        } catch (erro) {
            res.status(400).json({erro: erro.message})
        }
    }















}

module.exports = ReceitasController