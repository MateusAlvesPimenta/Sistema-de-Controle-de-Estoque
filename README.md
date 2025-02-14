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
1. Definir as entidades iniciais e seus relacionamentos. ✔️
* **Products**: `ProductId`, `Name`, `Description`, `Price`, `Quantity`, `SupplierId`.
* **Supplier**: `SupplierId`, `Name`, `PhoneNumber`, `Email`, `Address`.

2. Definir as entidades de vendas e seus relacionamentos. ⚙️
* **Sale**: `SaleId`, `SaleDate`, `CustomerName`, `SaleItems`, `Total`.
* **SaleItems**: `SaleItemId`, `SaleId`, `ProductId`, `Quantity`, `UnitPrice`.

3. Realizar as configurações necessárias para a API Funcionar e ser consumida pelo front-end. ✔️

### Implementar as funcionalidades básicas ⚙️

1. **Cadastro de entidades**: ✔️
* Adicionar, editar e excluir entidades.

2. **Listagem e busca de produtos**: ✔️
* Exibir os produtos por nome ou fornecedor.

3. **Gerenciamento de estoque**: ⚙️
* Atualizar a quantidade de produtos.
* Alerta para produtos com estoque abaixo do limite mínimo.
* Criar sistema de reabastecimento de estoque.

### Criação do Front-end. ⚙️
1. Criar interfaces para listagem, criação, edição e exclusão de fornecedores e produtos ✔️
2. Criar Uma Home page básica e temporária ✔️
3. Implementar um sistema de filtros para listagem de produtos de acordo com seu nome ou fornecedor. ✔️
4. Criar intefaces para visualização e simulação de vendas. 🛠️
5. Melhorias visuais e de código. 🛠️