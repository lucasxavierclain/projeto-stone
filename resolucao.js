// puxando a tabela e transformando em JSON
const xlsx = require('xlsx');
const tabela = xlsx.readFile('lista.xlsx', { cellDates: true });
const listaDeCompra = tabela.Sheets['lista_compra'];
const listaDeEmail = tabela.Sheets['lista_email'];
const dataEmail = xlsx.utils.sheet_to_json(listaDeEmail);
const dataCompra = xlsx.utils.sheet_to_json(listaDeCompra);

// Fazendo uma varredura para obter os dados das duas tabelas
const newDataCompra = dataCompra.map((record) => {

    const total = (record.Quantidade * record.Preco);
    if (isNaN(total)) {
        return 0
    } else {
        return total

    }
})
const newDataEmail = dataEmail.filter((record) => {
    const email = record.Email
    if (email.match(/@/ && /.com/)) {
        return record.Email
    }
})

// Fazendo a soma dos preços e da quantidade dos emails, e verificando se há algum tipo de quantidade e/ou preço com string
const total = newDataCompra.reduce((total, numero) => {
    if (!isNaN(numero))
        return total + numero;
}, 0)

// fixando o valor total para centavos
const totalSemVirgula = total.toFixed(2) * 100
const valorDividido = (totalSemVirgula / newDataEmail.length).toFixed(0)
let arrayValorDividido = [];

console.log('A lista possui os seguintes itens:')
const itens = dataCompra.map(itens => {

    if (!isNaN(itens.Preco) && !isNaN(itens.Quantidade)) {
        console.log(`* ${itens.Quantidade} ${itens.Itens}, com o preço de ${itens.Preco.toFixed(2) * 100} centavos`);
    }

})

console.log('\n\nA divisão por pessoa ficou da seguinte forma:\n')
// verificando se há diferença na soma dos valores divididos e retornando de acordo
if (totalSemVirgula % newDataEmail.length !== 0) {
    for (let x = 0; x < newDataEmail.length - 1; x++) {
        // incremento um array com valores divididos, com a mesma quantidade de nomes -1, 
        arrayValorDividido.push(valorDividido)
    }
    const totalArrayDividido = (valorDividido * newDataEmail.length).toFixed(0)
    // verifico a diferença de valores do valor total obtido e decremento do ultimo push a ser colocado, e depois mostro um laço de repetição para mostar os dados em uma mensagem
    if (totalArrayDividido !== totalSemVirgula) {
        arrayValorDividido.push(valorDividido - (totalArrayDividido - totalSemVirgula))
        for (let x = 0; x < newDataEmail.length; x++) {
            console.log(`O ${newDataEmail[x].Email} tem que pagar ${arrayValorDividido[x]} centavos`)
        }
    }
}
else {
    let valorTotalDividido = (totalSemVirgula / newDataEmail.length).toFixed(0)
    for (let x = 0; x < newDataEmail.length; x++) {
        console.log(`O ${newDataEmail[x].Email} tem que pagar ${valorTotalDividido} centavos`)
    }
}
console.log(`O total da conta é ${totalSemVirgula} centavos`)



