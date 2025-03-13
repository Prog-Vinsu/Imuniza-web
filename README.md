# Imuniza-Web

## Sistema de Vacinação e Gestão de Moradores



## 📋 Sobre o Projeto

O Imuniza-Web é um sistema completo para gestão de vacinação e registro de moradores, desenvolvido com o objetivo de facilitar o controle de campanhas de vacinação e manter um histórico preciso da imunização da população. O sistema permite o cadastro de moradores, fabricantes de vacinas, vacinas, lotes e o registro de aplicações.

### Funcionalidades Principais

- Gestão completa de moradores (CRUD)
- Cadastro de fabricantes de vacinas
- Gerenciamento de vacinas e seus lotes
- Registro de aplicações de vacinas
- Carteira de vacinação digital por morador
- Controle de validade de lotes de vacinas
- Validação de esquema vacinal (doses e intervalos)

## 🚀 Tecnologias Utilizadas

### Backend
- PHP 8.3.11
- Laravel 5.8.3
- MySQL (Banco de dados relacional)
- RESTful API

### Frontend
- React 19
- Context API para gerenciamento de estado
- React Router para navegação
- Styled Components/Tailwind CSS para estilização

## 🔧 Instalação e Configuração

### Pré-requisitos
- PHP 8.3
- Composer
- Node.js 22
- npm ou yarn
- MySQL

### Configuração do Backend

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/imuniza-web.git
cd imuniza-web
```

2. Instale as dependências do backend:
```bash
cd backend
composer install
```

3. Configure o arquivo de ambiente:
```bash
cp .env.example .env
```

4. Configure as variáveis do banco de dados no arquivo .env:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=imuniza-web
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

5. Gere a chave da aplicação:
```bash
php artisan key:generate
```

6. Execute as migrações para criar as tabelas do banco de dados:
```bash
php artisan migrate
```

7. Inicie o servidor de desenvolvimento:
```bash
php artisan serve
```

### Configuração do Frontend

1. Navegue até a pasta do frontend:
```bash
cd ../frontend
```

2. Instale as dependências:
```bash
npm install
# ou usando yarn
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou usando yarn
yarn start
```

## 📊 Estrutura do Banco de Dados

O sistema utiliza um banco de dados PostgreSQL com as seguintes entidades principais:

- **moradores**: Armazena dados dos moradores (nome, CPF, data de nascimento, etc.)
- **fabricantes**: Cadastro de fabricantes de vacinas
- **vacinas**: Informações sobre as vacinas disponíveis
- **vacina_lotes**: Controle de lotes de vacinas e validades
- **aplicacoes**: Registro das aplicações de vacinas em moradores

## 🖥️ Casos de Uso

O sistema implementa os seguintes casos de uso:

1. **Cadastrar Morador** - Gerenciamento completo do cadastro de moradores
2. **Cadastrar Fabricante** - Gestão das empresas fabricantes de vacinas
3. **Cadastrar Vacina** - Registro dos tipos de vacinas disponíveis
4. **Cadastrar Vacina Lote** - Controle de lotes e validades das vacinas
5. **Cadastrar Aplicação** - Registro da aplicação de doses em moradores

## 📝 Regras de Negócio

O sistema implementa as seguintes regras principais:

- Cada morador deve ter um CPF único
- A data de nascimento não pode ser uma data futura
- Cada fabricante deve ter um CNPJ único
- O conjunto nome + lote + fabricante de cada vacina deve ser único
- A validade de um lote não pode ser uma data passada
- Um morador não pode receber mais doses que o necessário para a vacina


## 👥 Autores

- **Vincenzo Tognere Polonini** - *Desenvolvedor Backend* - [Prog-Vinsu](https://github.com/Prog-Vinsu)
- **Thaelen Morais** - *Desenvolvedor Frontend* - [thaemorais](https://github.com/thaemorais)
