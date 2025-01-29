# Sistema de controle de estoque
Este projeto está em andamento e ainda não foi concluído e portanto terá muitas atualizações ainda.

## Tecnologias utilizadas 💻
* Asp.Net Core / Csharp
* React.js / Javascript
* Bootstrap

## Planos futuros
* 🛠️ - Por fazer.
* ⚙️ - Em andamento.
* ✔️ - Feito.

### Criar novas entidades e relacionamentos. ✔️
1. Definir as novas entidades e seus relacionamentos. 
* ✔️
* **Products**: `ProductId`, `Name`, `Description`, `Price`, `Quantity`, `CategoryId`, `SupplierId`.
* **Category**: `CategoryId`, `Name`.
* **Supplier**: `SupplierId`, `Name`, `PhoneNumber`, `Email`, `Address`.
* ⚙️
* **Sale**: `SaleId`, `SaleDate`, `CustomerName`, `SaleItems`, `Total`
* **SaleItems**: `SaleItemId`, `SaleId`, `ProductId`, `Quantity`, `Price`

3. Realizar as configurações necessárias para a API Funcionar e ser consumida pelo front-end. ✔️

### Implementar as funcionalidades básicas ⚙️

1. **Cadastro de entidades**: ✔️
* Adicionar, editar e excluir entidades.

2. **Gerenciamento de estoque**: 🛠️
* Atualizar a quantidade de produtos.
* Alerta para produtos com estoque abaixo do limite mínimo.

3. **Listagem e busca de produtos**: ✔️
* Exibir os produtos por nome, categoria ou fornecedor.

### Criar o Front-end. ⚙️
1. Criar interfaces para listagem, criação, edição e exclusão de fornecedores, categorias e produtos ⚙️
2. Implementar o sistema de filtros para listagem de produtos de acordo com seu fornecedor ou categorias. 🛠️
3. Criar intefaces para visualização e simulação de vendas. 🛠️
4. Melhorias visuais e de código. 🛠️