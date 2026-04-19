# 🛒 Shopping List Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)

Aplicação frontend para gerenciamento de listas de compras, desenvolvida com as melhores práticas de mercado e foco em performance, acessibilidade e escalabilidade.

---

## 🏗️ Arquitetura e Design

O projeto utiliza a arquitetura **Feature-Sliced Design (FSD)**, que permite uma separação clara de responsabilidades e facilita a manutenção à medida que o projeto cresce.

### Camadas do Projeto:
- **app/**: Configurações de rotas e providers da aplicação.
- **views/**: Componentes de nível de página (composição de features).
- **features/**: Lógica de negócio e componentes complexos (ex: Auth, Shopping List, Product).
- **shared/**: Componentes de UI primitivos, utilitários, constantes e serviços globais.
- **store/**: Gerenciamento de estado global utilizando **Valtio**.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS** (Estilização utilitária e responsiva)
- **Shadcn UI** (Componentes de interface baseados em Radix UI)
- **TanStack Query (React Query)** (Caching e sincronização de dados)
- **Valtio** (Estado global proxy-based)
- **Zod & React Hook Form** (Validação e gerenciamento de formulários)
- **Jest & React Testing Library** (Testes unitários)

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18 ou superior
- NPM ou Yarn

### Instalação
1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente (copie o `.env.example` para `.env`):
   ```bash
   cp .env.example .env
   ```

### Execução
```bash
npm run dev
```
Acesse `http://localhost:3000` no seu navegador.

---

## ✅ Qualidade e Testes

O projeto conta com uma suíte de testes unitários automatizados para garantir a estabilidade das funcionalidades críticas.

### Executar Testes
```bash
# Rodar todos os testes
npm test

# Rodar com cobertura
npm run test:coverage
```

### Evidências de Testes
As evidências de execução e métricas de cobertura podem ser encontradas no documento dedicado:
👉 **[Evidências de Testes - Frontend](doc/tests_evidence.md)**

---

## 📁 Principais Funcionalidades

- **Gerenciamento de Listas**: Criação, edição, exclusão e visualização de listas de compras.
- **Produtos**: Adição de itens às listas com controle de quantidade, preço e categoria.
- **Filtros Avançados**: Sistema de busca e filtragem por categorias e status (ex: Listas Compartilhadas).
- **Autenticação**: Fluxo completo de Login e Registro com persistência segura.
- **Design Premium**: Interface moderna com suporte a temas, feedback visual (Toasts) e estados de carregamento (Skeletons).

---

## 👤 Desenvolvedor
**Lucas Henrique** - [GitHub](https://github.com/luca-henrique)

---
*Este projeto é parte integrante de um desafio técnico para a Souv.*
