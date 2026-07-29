# 📦 Sistema de Controle de Estoque (Terminal)

Um sistema de controle de estoque desenvolvido em **Node.js** com integração ao **MySQL**, executado diretamente pelo terminal.

---

# 🎮 Sobre o Projeto

O projeto consiste em um sistema completo de gerenciamento de estoque via terminal, permitindo o cadastro, edição e gerenciamento de produtos, categorias, fornecedores, usuários e movimentações de estoque, utilizando persistência de dados em banco de dados MySQL.

O sistema foi desenvolvido com foco em:

* Prática de backend com Node.js
* Integração com MySQL
* Arquitetura modular
* CRUD completo
* Controle de estoque
* Relatórios gerenciais
* Autenticação de usuários
* Segurança de senhas
* Regras de negócio
* Controle de transações
* Organização e separação de responsabilidades

Projeto desenvolvido de forma autoral para fins de estudo e prática de desenvolvimento backend.

---

# 🚀 Funcionalidades

* 👤 Cadastro de usuários
* 🔑 Sistema de login
* 🔒 Criptografia de senhas com bcrypt
* 📦 Cadastro de produtos
* 🏷️ Cadastro de categorias
* 🚚 Cadastro de fornecedores
* ✏️ Edição de produtos
* ✏️ Edição de categorias
* ✏️ Edição de fornecedores
* 👤 Alteração de nome
* 📩 Alteração de email
* 🔑 Alteração de senha
* ❌ Desativação de conta
* ➕ Entrada de produtos no estoque
* ➖ Saída de produtos do estoque
* 📋 Histórico de movimentações
* 📊 Relatórios completos
* 🔍 Busca de produtos por nome
* 📂 Produtos por categoria
* ⚠️ Produtos com estoque baixo
* ❌ Produtos sem estoque
* 💰 Valor total do estoque
* 🔗 Relacionamento entre tabelas com Foreign Keys
* 🔄 Controle de transações com Commit e Rollback
* ⚠️ Tratamento de erros com Try/Catch
* ✅ Validação de dados informados
* ✅ Validação de emails duplicados
* ✅ Validação de categorias
* ✅ Validação de fornecedores
* ✅ Validação de produtos
* 🗑️ Exclusão lógica (Soft Delete)
* 🎨 Interface organizada no terminal
* ⏸️ Sistema de pause e fluxo controlado
* 🛠️ Integração real com MySQL

---

# 🎮 Menu Principal

```txt
1. Cadastrar usuário ➕
2. Fazer login 👤
0. Sair ❌
```

---

# 🖥️ Menu do Sistema

```txt
1. Produtos 📦
2. Categorias 🏷️
3. Fornecedores 🚚
4. Movimentações de Estoque 📋
5. Relatórios 📊
6. Minha Conta 👤
0. Sair ❌
```

---

# 📦 Menu de Produtos

```txt
1. Cadastrar produto
2. Listar produtos
3. Buscar produto
4. Editar produto
5. Excluir produto
0. Voltar
```

---

# 🏷️ Menu de Categorias

```txt
1. Cadastrar categoria
2. Listar categorias
3. Editar categoria
4. Excluir categoria
0. Voltar
```

---

# 🚚 Menu de Fornecedores

```txt
1. Cadastrar fornecedor
2. Listar fornecedores
3. Editar fornecedor
4. Excluir fornecedor
0. Voltar
```

---

# 📋 Menu de Movimentações

```txt
1. Entrada de produtos
2. Saída de produtos
3. Histórico de movimentações
0. Voltar
```

---

# 📊 Menu de Relatórios

```txt
1. Todos os produtos
2. Produtos por categoria
3. Produtos com estoque baixo
4. Produtos sem estoque
5. Movimentações de entrada
6. Movimentações de saída
7. Histórico completo
8. Valor total do estoque
0. Voltar
```

---

# 👤 Minha Conta

```txt
1. Alterar nome
2. Alterar email
3. Alterar senha
4. Desativar conta
0. Voltar
```

---

# 👤 Cadastro de Usuário

Durante o cadastro são solicitados:

```txt
🪪 - Nome
📩 - Email
🔑 - Senha
🔑 - Confirmação da senha
```

O sistema realiza validações para garantir:

* Campos obrigatórios
* Email único
* Confirmação correta da senha

Após o cadastro:

```txt
Cadastro realizado com sucesso! ✅
🆔: 1
```

---

# 🔑 Sistema de Login

O login é realizado utilizando:

* Email
* Senha

Exemplo:

```txt
📩 - Insira seu email
🔑 - Insira sua senha
```

---

# ✅ Login Correto

```txt
Logado com sucesso! ✅
```

---

# ❌ Login Inválido

O sistema impede o acesso quando:

* Usuário não existe
* Senha incorreta
* Conta desativada

Exemplos:

```txt
Usuário não encontrado! 🚫
```

```txt
Senha incorreta! 🚫
```

```txt
Conta desativada! 🚫
```

---

# 📦 Cadastro de Produtos

Durante o cadastro são informados:

```txt
🪪 - Nome
💰 - Preço
🔢 - Quantidade
🏷️ - Categoria
🚚 - Fornecedor
```

Antes do cadastro o sistema verifica se existem categorias e fornecedores cadastrados.

Após o cadastro:

```txt
Produto cadastrado com sucesso! ✅
🆔: 5
```

---

# 🏷️ Cadastro de Categorias

Durante o cadastro é solicitado:

```txt
🪪 - Nome da categoria
```

Após o cadastro:

```txt
Categoria cadastrada com sucesso! ✅
```

---

# 🚚 Cadastro de Fornecedores

Durante o cadastro são solicitados:

```txt
🪪 - Nome da empresa
📩 - Email
📞 - Telefone
```

O sistema valida:

* Campos obrigatórios
* Email único
* Telefone válido

Após o cadastro:

```txt
Fornecedor cadastrado com sucesso! ✅
```

---

# 📦 Movimentações de Estoque

O sistema possui um módulo responsável pelo controle de entrada e saída de produtos.

Todas as movimentações ficam registradas no banco de dados através de transações, permitindo rastrear quem realizou cada operação e quando ela foi executada.

---

## ➕ Entrada de Produtos

Permite adicionar novas unidades ao estoque.

Exemplo:

```txt
📌 - Selecione o ID do produto:
🔢 - Informe quantas quantidades entraram:
```

Após a operação:

```txt
Unidades adicionadas com sucesso! ✅
```

Durante a movimentação são registrados:

- Tipo da movimentação
- Quantidade
- Produto
- Usuário responsável
- Data da operação

---

## ➖ Saída de Produtos

Permite remover unidades do estoque.

Exemplo:

```txt
📌 - Selecione o ID do produto:
🔢 - Informe quantas quantidades saíram:
```

Após a operação:

```txt
Unidades removidas com sucesso! ✅
```

Cada saída também é registrada automaticamente no histórico do sistema.

---

## 📋 Histórico de Movimentações

Todas as entradas e saídas ficam armazenadas no banco de dados.

Informações registradas:

- ID da movimentação
- Tipo
- Produto
- Quantidade
- Usuário responsável
- Data

Exemplo:

```txt
Entrada
Saída
Entrada
Saída
```

---

# 👤 Minha Conta

O sistema possui uma área destinada ao gerenciamento da conta do usuário autenticado.

Menu:

```txt
1. Alterar nome 👤
2. Alterar email 📩
3. Alterar senha 🔑
4. Desativar conta 🚫
0. Voltar
```

---

## ✏️ Alteração de Nome

Permite atualizar o nome do usuário cadastrado.

Exemplo:

```txt
🪪 - Informe o novo nome:
```

Após a alteração:

```txt
Nome alterado com sucesso! ✅
```

---

## 📩 Alteração de Email

Permite alterar o email do usuário.

Validações:

- Campo obrigatório
- Email diferente do atual
- Email não utilizado por outro usuário

Após a alteração:

```txt
Email alterado com sucesso! ✅
```

---

## 🔑 Alteração de Senha

Para alterar a senha é necessário informar a senha atual.

Exemplo:

```txt
🔑 - Digite a senha atual:
🔑 - Digite a nova senha:
🔑 - Confirme a nova senha:
```

Validações:

- Senha atual correta
- Nova senha diferente da anterior
- Confirmação obrigatória

Após a alteração:

```txt
Senha alterada com sucesso! ✅
```

---

## 🚫 Desativar Conta

O sistema utiliza Soft Delete para usuários.

Antes da desativação é necessário confirmar a senha atual.

Exemplo:

```txt
🔑 - Confirme a senha atual:
```

Após confirmação:

```txt
Conta desativada com sucesso! ✅
```

---

# 📊 Relatórios

O sistema disponibiliza diversos relatórios para facilitar o gerenciamento do estoque.

Entre eles:

- 📦 Todos os produtos cadastrados
- 🏷️ Produtos por categoria
- ⚠️ Produtos com estoque baixo
- ❌ Produtos sem estoque
- 📈 Movimentações de entrada
- 📉 Movimentações de saída
- 📋 Histórico completo de movimentações
- 💰 Valor total do estoque

Todos os relatórios consultam diretamente o banco de dados utilizando consultas SQL.

---

## 💰 Valor Total do Estoque

Calcula automaticamente o valor financeiro total do estoque.

A consulta considera:

```txt
Quantidade × Preço
```

Resultado:

```txt
💰 Valor total do estoque:
R$ XXXXX,XX
```

---

# 🔒 Segurança

O sistema utiliza diversas práticas para garantir a integridade das informações.

Entre elas:

- Senhas criptografadas com bcrypt
- Queries parametrizadas utilizando `?`
- Comparação segura de hash
- Validação de autenticação
- Validação de dados informados
- Validação de categorias e fornecedores existentes
- Integridade relacional com Foreign Keys
- Controle de transações utilizando beginTransaction()
- Confirmação das operações com commit()
- Reversão automática utilizando rollback()
- Tratamento de exceções com try/catch

---

# 🗄️ Soft Delete

O projeto utiliza Soft Delete para preservar o histórico das informações.

Ao excluir um registro, ele não é removido fisicamente do banco de dados.

Em vez disso, o sistema altera o campo:

```sql
active = 0
```

Isso é utilizado para:

- Usuários
- Produtos
- Categorias
- Fornecedores

As consultas exibidas ao usuário retornam apenas registros ativos:

```sql
WHERE active = 1
```

Dessa forma, o histórico permanece preservado e a integridade dos relacionamentos é mantida.

---

# 📂 Estrutura do Projeto

```txt
market-nodejs-project/
├── database/
│   └── connection.js
│
├── menus/
│   ├── categoriesMenu.js
│   ├── internalSystemMenu.js
│   ├── inventoryMovementsMenu.js
│   ├── mainMenu.js
│   ├── myAccountMenu.js
│   ├── productEditMenu.js
│   ├── productsMenu.js
│   ├── reportsMenu.js
│   ├── supplierEditMenu.js
│   └── suppliersMenu.js
│
├── models/
│   ├── Category.js
│   ├── Movement.js
│   ├── Product.js
│   ├── Supplier.js
│   └── User.js
│
├── services/
│   ├── deactivateAccount.js
│   ├── deleteCategory.js
│   ├── deleteProduct.js
│   ├── deleteSupplier.js
│   ├── editCategory.js
│   ├── editProductCategory.js
│   ├── editProductName.js
│   ├── editProductPrice.js
│   ├── editProductSupplier.js
│   ├── editSupplierEmail.js
│   ├── editSupplierName.js
│   ├── editSupplierPhone.js
│   ├── editUserEmail.js
│   ├── editUserName.js
│   ├── editUserPassword.js
│   ├── inboundMovements.js
│   ├── listAllProducts.js
│   ├── listCategories.js
│   ├── listProducts.js
│   ├── listSuppliers.js
│   ├── login.js
│   ├── lowStockProducts.js
│   ├── movementHistory.js
│   ├── outboundMovements.js
│   ├── outOfStockProducts.js
│   ├── productsByCategory.js
│   ├── registerCategory.js
│   ├── registerProduct.js
│   ├── registerSupplier.js
│   ├── registerUser.js
│   ├── saveCategory.js
│   ├── saveProduct.js
│   ├── saveStockMovement.js
│   ├── saveSupplier.js
│   ├── saveUser.js
│   ├── searchProduct.js
│   ├── stockEntry.js
│   ├── stockExit.js
│   ├── stockMovementHistory.js
│   └── totalInventoryValue.js
│
├── utils/
│   ├── decryptPassword.js
│   ├── encryptPassword.js
│   ├── pause.js
│   └── time.js
│
├── validations/
│   ├── validateEmailSupplier.js
│   └── validateEmailUser.js
│
├── index.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

# 🧠 Conceitos Aplicados

- Desenvolvimento Backend com Node.js
- Arquitetura em camadas
- Modularização de código
- Separação de responsabilidades
- Programação assíncrona (`async/await`)
- Pool de conexões MySQL
- Queries SQL parametrizadas
- CRUD completo
- Persistência de dados
- Modelagem de banco de dados
- Soft Delete
- Relacionamentos com Foreign Keys
- INNER JOIN
- Validação de dados
- Tratamento de erros com `try/catch`
- Controle de transações (`beginTransaction`, `commit` e `rollback`)
- Criptografia de senhas com bcrypt
- Sistema de autenticação
- Regras de negócio
- Controle de estoque
- Movimentações de entrada e saída
- Geração de relatórios
- Interface CLI utilizando `readline`

---

# 🗄️ Operações SQL Utilizadas

```sql
CREATE DATABASE
CREATE TABLE
ALTER TABLE
ADD CONSTRAINT
REFERENCES

SELECT
INSERT
UPDATE

WHERE
ORDER BY

INNER JOIN

SUM

LIKE

FOREIGN KEY

AUTO_INCREMENT

COMMIT
ROLLBACK
```

---

# 🛠️ Tecnologias Utilizadas

- Node.js
- JavaScript
- MySQL
- mysql2
- bcrypt
- readline

---

# ⚙️ Como Executar

## Clone o repositório

```bash
git clone https://github.com/joaopedro-h/market-nodejs-project.git
```

---

## Entre na pasta do projeto

```bash
cd market-nodejs-project
```

---

## Instale as dependências

```bash
npm install
```

---

## Instale os pacotes necessários

```bash
npm install mysql2 bcrypt
```

---

# 🗄️ Configure o Banco de Dados

## Crie o banco

```sql
CREATE DATABASE market;
```

---

## Crie a tabela de usuários

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);
```

---

## Crie a tabela de categorias

```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);
```

---

## Crie a tabela de fornecedores

```sql
CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);
```

---

## Crie a tabela de produtos

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    category_id INT NOT NULL,
    supplier_id INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (category_id)
        REFERENCES categories(id),

    FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
);
```

---

## Crie a tabela de movimentações

```sql
CREATE TABLE stock_movements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES products(id),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);
```

---

# 🔌 Configure a conexão

No arquivo

```txt
database/connection.js
```

configure os dados do seu MySQL:

```js
host
user
password
database
```

---

# ▶️ Execute o Projeto

```bash
node index.js
```

---

# 📚 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de praticar e consolidar conhecimentos em desenvolvimento backend utilizando Node.js e MySQL, aplicando conceitos utilizados em sistemas reais de gerenciamento de estoque.

Durante o desenvolvimento foram praticados:

- Desenvolvimento Backend com Node.js
- Banco de Dados MySQL
- CRUD completo
- Modelagem de banco de dados
- Relacionamentos entre tabelas
- Foreign Keys
- Integridade referencial
- Programação assíncrona com Async/Await
- Queries SQL parametrizadas
- Organização em arquitetura modular
- Separação de responsabilidades
- Sistema de autenticação
- Criptografia de senhas com bcrypt
- Soft Delete
- Validação de dados
- Controle de movimentações de estoque
- Relatórios administrativos
- Controle de transações utilizando Commit e Rollback
- Tratamento de erros com Try/Catch
- Persistência de dados
- Desenvolvimento de aplicações CLI (Terminal)

---