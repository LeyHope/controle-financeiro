const database = require('../models/index')

class ReceitasController {

    static async registraReceita(req, res) {
        const {descricao, valor, data} = req.body


        const regExp1 = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
        const foundEnviado = regExp1.exec(data)
        const mesEnviado = foundEnviado[1]
        console.log(mesEnviado)

        if(!valor) {
            return res.status(400).json({msg: 'O valor é obrigatória'})
        }

        if(!data) {
            return res.status(400).json({msg: 'A data é obrigatória'})
        }

        if(!descricao) {
            return res.status(400).json({msg: 'A descrição é obrigatória'})
        }

        const busca = await database.Receitas.findOne({
            where: {
                descricao: descricao
            }
        })


        if (!busca) {
            const receitaCriada = await database.Receitas.create({descricao, valor, data})
            return res.status(201).json(`Receita cadastrada!`)

        }


        const dataBuscada = busca.data
        const found = regExp1.exec(dataBuscada)
        const mesBuscado = found[1]

        console.log(mesBuscado)

        if(descricao === busca.descricao && mesEnviado === mesBuscado) {
            return res.status(400).json({msg: 'Essa receita desse mês já foi cadastrada'})
        
        } else {
            const receitaCriada = await database.Receitas.create({descricao, valor, data})
            return res.status(201).json(`Receita cadastrada!`)
        }

    }



    static async listaTodasAsReceitas (req, res) {

        try {
            const todasAsReceitas = await database.Receitas.findAll()
            return res.status(200).json(todasAsReceitas)

        } catch (erro) {
            return res.status(400).json({erro: erro.message})

        }
    }


    static async pegaUmaReceita (req, res) {
        const {id} = req.params

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




    static async atualizaReceita(req, res) {
        const {id} = req.params
        const {descricao, valor, data} = req.body

 
        try {

            const receitaConsultada = await database.Receitas.findByPk(id)

            receitaConsultada.descricao = descricao
            receitaConsultada.valor = valor
            receitaConsultada.data = data

            const receitaAlterada = await receitaConsultada.save()

            return res.status(200).json(receitaAlterada)


        } catch (erro) {
            return res.status(400).json({erro: erro.message})

        }
    }



    static async deletaReceita(req, res) {
        const {id} = req.params

        try {
            database.Receitas.destroy({
                where: {
                    id:id
                }
            })

            return res.status(200).json({msg: `O ${id} foi deletado com sucesso`})

        } catch (erro) {
            return res.status(400).json({erro: erro.message})
        }

    }











}

module.exports = ReceitasController