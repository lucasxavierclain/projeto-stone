#Leitura de dados das planilhas!  
  
###Comandos usados para instalar e rodar o programa:
*npm init -y
*npm i xlsx
*node resolucao.js


Para fazer esse projeto eu utilizei a dependência *xlsx* para puxar os dados da planilha e estrair as tabelas

Utilizei o *map*, *filter* e *reducer* para mapear cada item e fazer a verificação se havia alguma característica que invalidasse ele, para retornar com informações válidas.

Fiz um *laço condicional* para ver se a soma dos valores divididos era igual ao valor total recebido, e se não for, há um tratamento de dados para retornar o último valor dividido alterado, para a soma ficar igual.Caso não precisasse tratar o valor, era retornado os números de forma direta.

Criei uma planilha como exemplo para testar o programa e utilizei tipos de caracteres para testar a aplicação. Basicamente usei uma planilha com duas tabelas e coloquei alguns tipos diferentes de dados para ver como o programa se portava.