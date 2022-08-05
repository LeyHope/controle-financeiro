const Services = require('../services/Services')
const database = require('../models')
const { json } = require('body-parser')



const despesasServices = new Services('Despesas')


class DespesasController {

    static async criaDespesa (req, res) {
        const {descricao, valor, data} = req.body

        const despesa = {
            descricao, valor, data
        }

        try {
            await despesasServices.verificaCampo(descricao)
            await despesasServices.verificaCampo(valor)
            await despesasServices.verificaCampo(data)

            const busca = await despesasServices.buscaUmRegistroDescricao(descricao)

            if(!busca) {
                await despesasServices.registraUmItem(despesa)
                return res.status(201).json('Despesas registrada!')
            }

            const busca2 = await database.Despesas.findAll({
                where: {
                    descricao: descricao,
                    data: data
                }
            })


            if(busca2.length === 0) {
                await despesasServices.registraUmItem(despesa)
                return res.status(201).json('Despesas registrada!')

            } else {
                return res.status(400).json('Despesa já registrada, tente outra.')
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
}

module.exports = DespesasController