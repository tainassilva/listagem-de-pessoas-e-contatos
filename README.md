<h1 style="text-align: center;">Gerenciador de Pessoas e Contatos</h1>

<div style="display: flex; gap: 10px;">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
</div>


## 📌 Sobre o projeto

Este projeto é um **Gerenciador de Pessoas e Contatos**, composto por um backend em **Spring Boot** e um frontend em **Angular 16**. O sistema permite cadastrar, editar, listar e excluir pessoas e seus respectivos contatos.

## 🚀 Tecnologias utilizadas

### **Frontend:**
- Angular 16
- TypeScript
- HTML, CSS
- Bootstrap

### **Backend:**
- Java 21
- Spring Boot 3.4.2
- Spring Data JPA
- Hibernate

### **Banco de Dados:**
- H2 Database

### **Outras ferramentas:**
- Node.js 18+
- Angular CLI 16
- Maven 3+
- Git

## 🛠️ Configuração do ambiente

### 🔧 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter os seguintes itens instalados:

- **Backend:**
  - Java 21
  - Maven 3+

- **Frontend:**
  - Node.js 18+
  - Angular CLI 16+
  - Git

## 💻 Como rodar o projeto

### 🔹 Backend (Spring Boot)

1. Clone o repositório:
```bash
   git clone https://github.com/tainassilva/listagem- de-pessoas-e-contatos.git
```

```bash
cd listagem-de-pessoas-e-contatos/backend/Controle-de-contatos
```

2. Compile e inicie o backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. O backend estará rodando em **http://localhost:8080/api/pessoas**.

### 🔹 Frontend (Angular 16)

1. Entre no diretório do frontend:
   ```bash
   cd ../../frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

4. O frontend estará disponível em **http://localhost:4200**.

## 📍 Endpoints principais

| Método | Rota              | Descrição                           |
|--------|-------------------|-------------------------------------|
| GET    | `/pessoas`        | Lista todas as pessoas              |
| POST   | `/pessoas`        | Cadastra uma nova pessoa e contatos          |
| GET    | `/pessoas/{id}`   | Busca uma pessoa por ID            |
| PUT    | `/pessoas/{id}`   | Atualiza dados da pessoa e seus contaos            |
| DELETE | `/pessoas/{id}`   | Remove uma pessoa e seu contato                 |


## 🤝 Contribuição

1. Faça um **fork** do projeto.
2. Crie uma **branch**:
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um **Pull Request**.

---

🔥 **Agora você está pronto para rodar e contribuir com o projeto!**

---