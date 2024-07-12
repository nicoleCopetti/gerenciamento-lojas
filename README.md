# Gerenciamento de Lojas

Este é um projeto de gerenciamento de lojas desenvolvido com React. O sistema permite a realização de operações CRUD (Create, Read, Update, Delete) para vendedores, clientes e vendas, além de oferecer a visualização de relatórios detalhados. Este projeto representa apenas o front-end da aplicação, que se comunica com uma API externa para a gestão dos dados e com outra API para a obtenção de endereços via CEP.

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/gerenciamento-lojas.git
cd gerenciamento-lojas
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```plaintext
REACT_APP_LOJAS_URL=http://localhost:3000/api
REACT_APP_VIACEP_API_URL=https://viacep.com.br/ws
```

### 4. Execute o projeto

```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```plaintext
.
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   └── ...
│   ├── pages
│   │   └── ...
│   ├── services
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
└── README.md
```

- `public/`: Contém os arquivos públicos do projeto.
- `src/`: Contém o código-fonte do projeto.
  - `components/`: Contém os componentes React.
  - `pages/`: Contém as páginas React.
  - `services/`: Contém os serviços para comunicação com as APIs.
  - `App.js`: Componente principal da aplicação.
  - `index.js`: Ponto de entrada do React.
- `.env`: Arquivo de configuração das variáveis de ambiente.
- `package.json`: Contém as dependências e scripts do projeto.
- `README.md`: Este arquivo.

## Funcionalidades

- **Clientes**: Cadastro, edição, exclusão e listagem de clientes.
- **Vendedores**: Cadastro, edição, exclusão e listagem de vendedores.
- **Vendas**: Registro, edição, exclusão e listagem de vendas.
- **Relatórios**: Visualização de relatórios de vendas agrupados por período.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.