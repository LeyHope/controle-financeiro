const database = require('../models')


class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async registraUmItem (item) {

        const itemCriado = await database[this.nomeDoModelo].create(item)
        return itemCriado

    }

    async verificaCampo(campo) {
        if(!campo) {
            throw (`Não pode haver campos em branco`)
        }
    }

    async buscaUmRegistroDescricao(descricao) {
        const registro = await database[this.nomeDoModelo].findOne({
            where: {
                descricao:descricao
            }})

        return registro
    }

    async verificaOMes(dataEnviada, dataBuscada) {
        const regExp1 = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
        const encontraEnviada = regExp1.exec(dataEnviada)
        const mesEnviado = encontraEnviada[1]

        const encontraBuscada = regExp1.exec(dataBuscada)
        const mesBuscado = encontraBuscada[1]

        if (mesEnviado === mesBuscado) {
            return true
        } else {
            return false
        }
    }
}

module.exports = Services