<h1 align="center" style="color:#4ade80; font-weight: 700; margin-bottom: 0.5rem;">
  🚁 Bem-vindo ao Drone Delivery 🚀
</h1>

<p align="center">
  Este repositório contém o código-fonte do sistema <strong>Drone Delivery</strong>, que gerencia entregas por drones em áreas urbanas, com controle de pedidos, drones e simulação de voos.
</p>

---

## 💻 Tecnologias

<div align="left">
  <a href="#">
    <img src="https://skillicons.dev/icons?i=nodejs,ts,express,prisma,postgres,react,tailwind,vite,jest&theme=dark" />
  </a>
</div>

---

## 📋 Organização do Projeto

Durante o desenvolvimento deste sistema, utilizei um **quadro no Trello** para planejar, acompanhar e documentar cada etapa.  
Isso ajudou a manter o foco, garantir que todas as entregas fossem concluídas e facilitar revisões.

### Estrutura de Etapas

- 🟦 **Etapa 1 – Setup Inicial**  
  Configuração do mono-repo, backend, frontend e estrutura de pastas.

- 🟩 **Etapa 2 – Modelagem de Dados e Banco**  
  Definição das entidades, configuração do Prisma, migrations e dados iniciais.

- 🟨 **Etapa 3 – Lógica Principal do Backend**  
  Endpoints principais, lógica de alocação de drones, simulação de voo e bateria.

- 🟧 **Etapa 4 – Frontend**  
  Interfaces para pedidos, entregas, dashboard, status em tempo real e integração com backend.

- 🟥 **Etapa 5 – Testes e Simulação**  
  Testes unitários, de carga e validações.

- 🟪 **Etapa 6 – Finalização e Deploy**  
  Deploy backend e frontend, documentação e extras.

🔗 **Quadro no Trello**: [Acessar aqui](https://trello.com/b/3C1t3vv8/projeto-drone)

---

## 📜 Sobre o Projeto

Este sistema simula um ambiente para gerenciamento de entregas por drones, incluindo:

- Cadastro de pedidos com localização, peso e prioridade
- Alocação inteligente de pacotes para drones respeitando capacidade e alcance
- Simulação dos estados dos drones (Idle, Carregando, Em voo, etc.)
- Dashboard com métricas básicas e status
- Testes automatizados para regras principais

---

## 🚀 Como Rodar

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/joao-victor-fonseca/drone-delivery.git
cd drone-delivery
```

### Backend

```bash
cd backend
npm install
npx prisma migrate deploy
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

<h2>🌐 Minhas Redes Sociais</h2>

<p>
  <a href="https://github.com/joao-victor-fonseca" target="_blank">
    <img src="https://skillicons.dev/icons?i=github&theme=dark" width="40" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/joao-victor-fonseca-assis-b17516207/" target="_blank">
    <img src="https://skillicons.dev/icons?i=linkedin&theme=dark" width="40" alt="LinkedIn" />
  </a>
  <a href="mailto:joaovictorfosecaassis@gmail.com" target="_blank">
    <img src="https://skillicons.dev/icons?i=gmail&theme=dark" width="40" alt="Gmail" />
  </a>
</p>

---

## 👨‍💻 Autor

<p align="center">
  <a href="https://github.com/joao-victor-fonseca" target="_blank">
    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/84512746?v=4" width="100px" alt="João Victor Fonseca Assis"/>
    <br />
    <sub><b>João Victor Fonseca Assis</b></sub>
  </a>
</p>

<p align="center">
  Desenvolvido com ❤️ por <strong>João Victor Fonseca Assis</strong>.<br>
  Entre em contato para dúvidas, ideias ou colaborações!
</p>
