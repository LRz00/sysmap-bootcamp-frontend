
# Desafio Bootcamp Sysmap- Front-End.

Este projeto é um serviço de front-end para um e-commerce de discos de vinil. Ele implementa um programa de fidelidade baseado em pontos para aumentar o volume de vendas e fidelizar clientes. O sistema aplica pontos aos clientes com base no dia da semana em que a compra é realizada, conforme uma tabela de pontos definida.

## Rotas

Aqui está a lista de rotas disponíveis na aplicação(Todas funcionando como esperado com integração com o back-end):

- `/` 
  - Renderiza o componente `Landing`, que é a página principal da aplicação.

- `/signup` 
  - Renderiza o componente `Register`, permitindo que os usuários criem uma nova conta.

- `/login` 
  - Renderiza o componente `Login` para autenticação dos usuários.

- `/home`
  - Renderiza o componente `MainHome`, que é o dashboard principal após o login.

- `/myalbums` 
  - Renderiza o componente `MyCollection`, exibindo a coleção de álbuns do usuário.

- `/mywallet`
  - Renderiza o componente `Wallet`, mostrando detalhes da carteira do usuário, como saldo e transações.

- `/*` 
  - Renderiza o componente `NotFound` para rotas que não correspondem a nenhuma existente.




## Tecnologias Utilizadas

- **React**: Framework JavaScript para criação de interfaces de usuário.
- **TypeScript**: Tipagem estática para JavaScript.
- **Tailwind CSS**: Framework CSS para estilização.
- **Axios**: Cliente HTTP para consumir a API.

## Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn** para gerenciar pacotes

## Configuração do Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/bc-fullstack-05/lara_dacilde_mendes_rodrigues.git
cd lara_dacilde_mendes_rodrigues/sysfrontend
```

### 2. Instalar dependências

Execute o comando abaixo para instalar as dependências do projeto.


```bash
npm install
```

### 3. Configurar a API Base URL

A URL da API está configurada no arquivo `src/service/axios.ts`. Verifique se a URL da sua API backend está correta:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://myfrota.pt/api',
});

export default api;
```

### 4. Executar o Projeto

Após instalar as dependências e configurar a URL da API, execute o seguinte comando para rodar a aplicação:


```bash
npm run dev
```


Abra seu navegador na URL indicada e utilize a aplicação.



- **Nome:** Lara Rodrigues
- **Email:** lararods73@gmial.com
