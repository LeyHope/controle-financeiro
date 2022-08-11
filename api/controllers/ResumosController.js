const database = require('../models')
const { Op, DatabaseError } = require('sequelize')
const e = require('express')



function analise(categoria, categoriaCadastrada, nomeCategoria, e) {
    if(categoria === categoriaCadastrada){
        nomeCategoria += parseInt(e.valor)
        console.log(`${categoriaCadastrada}: ${nomeCategoria}`)
    }
    return nomeCategoria
}

class ResumosController {

    static async resumo(req, res) {
        const {ano, mes} = req.params

        try {
            const consultaReceita = await database.Receitas.findAll({
                // attributes: ['valor'],
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
                let valorDoElemento = parseInt(element.valor)
                valorTotalReceita = valorTotalReceita + valorDoElemento
            });

            let valorTotalDespesa = 0
            consultaDespesas.forEach(element => {
                let valorDoElementoDespesa = parseInt(element.valor)
                valorTotalDespesa = valorTotalDespesa + valorDoElementoDespesa
            });

            const balanco = valorTotalReceita - valorTotalDespesa


            let alimentacao = 0
            let saude = 0
            let moradia = 0
            let transporte = 0
            let educacao = 0
            let lazer = 0
            let imprevistos = 0
            let outros = 0


            consultaDespesas.forEach(e => {              
                const categoria = e.categoria
                if(categoria === 1) {
                    alimentacao = alimentacao + parseInt(e.valor)
                }
                if(categoria === 2) {
                    saude = saude + parseInt(e.valor)
                }
                if(categoria === 3) {
                    moradia += parseInt(e.valor)
                }
                if(categoria === 4) {
                    transporte += parseInt(e.valor)  
                }
                if(categoria === 5) {
                    educacao += parseInt(e.valor)
                }
                if(categoria === 6) {
                    lazer += parseInt(e.valor)
                }
                if(categoria === 7) {
                    imprevistos += parseInt(e.valor)
                }
                if(categoria === 8) {
                    outros += parseInt(e.valor)
                }
                
            })

            // console.log(`Alimentação: ${alimentacao}`)
            // console.log(`Saúde: ${saude}`)
            // console.log(`Moradia: ${moradia}`)
            // console.log(`Transporte: ${transporte}`)
            // console.log(`Educação: ${educacao}`)
            // console.log(`Lazer: ${lazer}`)
            // console.log(`Imprevistos: ${imprevistos}`)
            // console.log(`Outros: ${outros}`)

            const lista = [
                {alimentacao},
                {saude},
                {moradia},
                {transporte},
                {educacao},
                {lazer},
                {imprevistos},
                {outros}
            ]

            const novaLista = []

            for(let i = 0; i<lista.length; i++){
                if(Object.values(lista[i])>0){
                  //console.log(Object.values(lista2[i]))
                  let key = Object.keys(lista[i])
                  let value = Object.values(lista[i])
                  let adicionar = `${key}: ${value}`
                  novaLista.push(adicionar)
                }
              }
              console.log(novaLista)


            return res.status(200).json({"Total de Receitas": valorTotalReceita, "Total de Despesas": valorTotalDespesa, "Saldo": balanco, "Despesas por categoria": novaLista})

        } catch (erro) {
            return res.status(400).json(erro.message)
        }


    }




}

module.exports = ResumosController