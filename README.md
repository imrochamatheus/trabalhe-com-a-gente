# GitHub Search

Uma aplicação full-stack que permite pesquisar repositórios do GitHub com paginação e exibição de dados relevantes como descrição, estrelas, watchers e issues. Desenvolvida como solução para o desafio de Full-Stack Developer.

---

## 🧩 Visão Geral

- **Frontend:** SPA desenvolvido em **Angular**, responsável pela interface de busca e exibição.
- **Backend:** API desenvolvida em **NestJS**, responsável por intermediar a comunicação com a API pública do GitHub.
- A aplicação está containerizada com **Docker** e orquestrada com **Docker Compose**.

---

## 📦 Tecnologias Utilizadas

### Frontend (Angular)

- Angular 17+
- RxJS
- Angular CLI
- PrimeNG
- Testes: Jest

### Backend (NestJS)

- NestJS 10+
- Axios (para requisições HTTP)
- Testes: Jest

### Infraestrutura

- Docker
- Docker Compose
- Nginx (para servir a SPA em produção)

---

## ▶️ Como Executar a Aplicação (Docker)

### Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos

1. Clone este repositório:

   ```bash
   git clone https://github.com/imrochamatheus/trabalhe-com-a-gente
   cd trabalhe-com-a-gente
   ```

2. Execute os containers:

   ```bash
   docker-compose up --build
   ```

3. Acesse a aplicação:
   - **Frontend (SPA):** [http://localhost:4200](http://localhost:8200)
   - **Backend (API NestJS):** [http://localhost:3000](http://localhost:3000)

> 🔁 Para reiniciar: `docker-compose down && docker-compose up --build`

---

## 🧪 Como Executar os Testes

### Frontend (Angular)

Dentro da pasta `frontend/`:

```bash
npm install
npm run test
```

- Executa os testes unitários com **Jest**
- Para testar cobertura de código:
  ```bash
  npm run test:coverage
  ```

### Backend (NestJS)

Dentro da pasta `backend/`:

```bash
npm install
npm run test
```

- Executa os testes unitários com **Jest**
- Para testar cobertura de código:
  ```bash
  npm run test:cov
  ```

---

## 💡 Diferenciais Implementados

- Integração via backend com a API do GitHub (NestJS)
- Paginação baseada em parâmetros da API
- Testes unitários em ambas as stacks
- Dockerização completa com `nginx`, build de produção e deploy local
- Uso de boas práticas de codificação, modularização e responsabilidade única
