# Sistema de controle de estoque
Este projeto está em andamento e ainda não foi concluído e portanto terá muitas atualizações ainda.

## Tecnologias utilizadas 💻
* Asp.Net Core / Csharp
* React.js / Javascript
* HTML, CSS e Bootstrap
* BatchFile

## Requisitos para rodar esta aplicação:

* Back-end: 
1. Necessário .Net 7 instalado e funcionando.
2. Alterar a "ConnectionString" conforme necessário para que utilize seu banco de dados.
3. execute o comando `dotnet ef database update` para criar as entidades no seu banco de dados .

* Front-end: 
1. Necessário npm e o node instalados e funcionando.
2. Abrir um CMD na pasta "Front-end" e digitar o seguinte comando `npm install` para instalar todas as dependências do projeto.

* Tendo tudo configurado, basta abrir o arquivo `Starter.cmd` que ele iniciará toda a aplicação e abrira os 2 CMDs necessários para a aplicação rodar **não feche nenhum dos 2 a menos que você queira encerrar a aplicação**, nesse caso feche os 2.


## Planos futuros
* 🛠️ - Por fazer.
* ⚙️ - Em andamento.
* ✔️ - Feito.

### Criar novas entidades e relacionamentos. ✔️
1. Definir as entidades iniciais e seus relacionamentos. ✔️
* **Products**: `ProductId`, `Name`, `Description`, `Price`, `Quantity`, `SupplierId`.
* **Supplier**: `SupplierId`, `Name`, `PhoneNumber`, `Email`, `Address`.

2. Definir as entidades de vendas, despesas e seus relacionamentos. ✔️
* **Sale**: `SaleId`, `SaleDate`, `CustomerName`, `SaleItems`, `Total`. 
* **SaleItems**: `SaleItemId`, `SaleId`, `ProductId`, `Quantity`, `Price`. 
* **Expense**: `ExpenseId`, `Name`, `Price`, `ExpenseDate` 

3. Realizar as configurações necessárias para a API Funcionar e ser consumida pelo front-end. ✔️

### Implementar as funcionalidades básicas ✔️

1. **Cadastro de entidades**: ✔️
* Adicionar, editar e excluir entidades.

2. **Listagem e busca de produtos**: ✔️
* Exibir os produtos por nome ou fornecedor.

3. **Gerenciamento de estoque**: ✔️
* Atualizar a quantidade de produtos.
* Alerta para produtos com estoque abaixo do limite mínimo.
* Criar sistema de reabastecimento de estoque.

### Criação do Front-end. ⚙️
1. Criar interfaces para listagem, criação, edição e exclusão de fornecedores e produtos ✔️
2. Criar Uma Home page básica e temporária ✔️
3. Implementar um sistema de filtros para listagem de produtos de acordo com seu nome ou fornecedor. ✔️
4. Criar uma inteface para visualização e cadastro de vendas. ✔️
5. Criar filtro para vendas de acordo com a data da venda. ✔️
6. Criar uma interface para visualização e cadastro de despesas. 🛠️
7. Criar uma interface de dashboard simples que apresente o valor de vendas, despesas e lucro dos ultimos 30 dias. 🛠️
8. Adicionar uma ligação entre vendas e despesas com o dashboard para que ambos sejam acessados através ele. 🛠️
9. Adicionar uma aba no dashboard de produtos mais vendidos. 🛠️
* Final: Melhorias visuais e de código. 🛠️