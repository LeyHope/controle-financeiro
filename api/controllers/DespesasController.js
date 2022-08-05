const Services = require('../services/Services')
const database = require('../models')



const despesasServices = new Services('Despesas')


class DespesasController {

    static async criaDespesa (req, res) {
        const {descricao, valor, data} = req.body


        const mesEnviado = data.slice(5,7)

        const despesa = {
            descricao: descricao,
            valor: valor,
            data: data, 
            mes: mesEnviado
        }


        try {

            if (!descricao) {
                throw ('A descrição é obrigatória')
            }

            if (!valor) {
                throw ('O valor não pode ficar em branco')
            }

            if(!data) {
                throw ('A data não pode ficar em branco')
            }

            const busca = await database.Despesas.findOne({
                where: {
                    descricao: descricao,
                    mes: mesEnviado 
                }
            })


            if (!busca) {
                await database.Despesas.create(despesa)
                return res.status(201).json('Despesa cadastrada com sucesso.')

            } else {
                throw ('Despesa já registrada')
            }

        } catch (erro) {
            return res.status(400).json(erro)
        }      

        

    }

    static async apagaDespesa(req, res) {
        const {id} = req.params
        try {
            await database.Despesas.destroy({
                where: {
                    id:id
                }
            })
            return res.status(200).json('Despesas apagada!')
        } catch (erro) {
            return res.status(400).json(erro)
        }
    }

    static async listaTodasAsDespesas(req, res) {
        try {
            const busca = await database.Despesas.findAll()
            return res.status(200).json(busca)
        } catch (erro) {
            return res.status(400).json(erro)
        }
    }

    static async pegaUmaDespesa(req, res) {
        const {id} = req.params
        try {
            const busca = await database.Despesas.findOne({
                where: {
                    id:id
                }
            })
            return res.status(200).json(busca)
        } catch (erro) {
            return res.status(400).json(erro)
        }
    }

    static async atualizaDespesa(req, res) {
        const {id} = req.params
        const {descricao, valor, data} = req.body

        const mesEnviado = data.slice(5,7)

        try {
            const busca = await database.Despesas.findByPk(id)

            busca.descricao = descricao
            busca.valor = valor
            busca.data = data
            busca.mes = mesEnviado

            const buscaAtualizada = await busca.save()


            return res.status(200).json(buscaAtualizada)
        } catch (erro) {
            return res.status(400).json(erro)
        }
    }
}

module.exports = DespesasController