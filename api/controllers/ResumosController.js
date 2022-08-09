const database = require('../models')
const { Op } = require('sequelize')
const e = require('express')

class ResumosController {

    static async resumo(req, res) {
        const {ano, mes} = req.params

        try {
            const consultaReceita = await database.Receitas.findAll({
                attributes: ['valor'],
                where: {
                    data: {
                        [Op.like]: `${ano}-${mes}-%`
                    }
                }
            })
            
            const consultaDespesas = await database.Despesas.findAll({
                where: {
                    data: {
                        [Op.like]: `${ano}-${mes}-%`
                    }
                }
            })



            let valorTotalReceita = 0


            consultaReceita.forEach(element => {
                const valorDoElemento = element.valor
                const converte = parseInt(valorDoElemento)
                valorTotalReceita = valorTotalReceita + converte
            });
            console.log(valorTotalReceita)




            return res.status(200).json({Receitas: consultaReceita, Despesas: consultaDespesas})

        } catch (erro) {
            return res.status(400).json(erro.message)
        }


    }

}

module.exports = ResumosController