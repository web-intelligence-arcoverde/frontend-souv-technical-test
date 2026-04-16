# Documentação Técnica de Design e Migração

Este documento fornece uma visão detalhada da arquitetura, padrões e tecnologias utilizadas no projeto `frontend-souv-technical-test`, servindo como guia para migração ou expansão do sistema.

## 🚀 Stack Tecnológica

O projeto foi construído com as tecnologias mais recentes do ecossistema React:

- **Framework**: [Next.js 16.2.3](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4+](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- **Gerenciamento de Estado**:
  - **Global/UI**: [Valtio](https://valtio.dev/) (Estado mutável proxy)
  - **Server State**: [TanStack Query v5](https://tanstack.com/query/latest) (Cache, sincronização e fetch de dados)
- **Formulários**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (Validação de esquema)
- **Requisições API**: [Axios](https://axios-http.com/)
- **Testes**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🏗️ Arquitetura de Software

O projeto utiliza uma estrutura modular inspirada em **Feature-Sliced Design (FSD)**, combinada com **Atomic Design** para a camada de UI.

### Estrutura de Diretórios (`src/`)

- **`app/`**: Contém as rotas, layouts e páginas do Next.js.
- **`features/`**: Lógica de negócio organizada por domínio (ex: `auth`, `collections`). Cada feature encapsula seus próprios componentes, hooks e tipos.
- **`shared/`**: Elementos compartilhados por toda a aplicação.
  - **`ui/`**: Componentes de interface organizados por **Atomic Design** (`atoms`, `molecules`, `organisms`, `templates`).
  - **`api/`**: Configurações base do Axios.
  - **`state/`**: Proxies do Valtio para estado global.
  - **`utils/`**: Funções auxiliares genéricas.
- **`services/`**: Camada de comunicação com a API (Services), separando a lógica de requisição dos componentes.
- **`store/`**: Definições de estado global persistente ou compartilhado.
- **`hooks/`**: Custom hooks de uso geral.

---

## 🎨 Padrões de Design e UI

### Atomic Design

Os componentes básicos (`src/shared/ui`) seguem a hierarquia:

1.  **Atoms**: Componentes indivisíveis (Buttons, Inputs, Labels).
2.  **Molecules**: Grupos de atoms (Form fields, Search bars).
3.  **Organisms**: Seções complexas (Header, Modals, Forms completos).
4.  **Templates**: Layouts de página.

### Estilização

- Utiliza **Shadcn UI** (componentes do `src/components/ui`) como base, customizados via Tailwind CSS.
- Animações suaves implementadas com `tailwindcss-animate`.

---

## 🔐 Fluxos e Gerenciamento de Dados

### Autenticação

- Implementada via `src/services/auth.service.ts` e gerenciada globalmente no `src/store/auth.ts` usando Valtio.
- Suporta fluxos de Login e Registro.

### Sincronização de Dados (React Query)

- **Fetching**: Utiliza `useQuery` para obter dados das listas e produtos.
- **Mutations**: Utiliza `useMutation` para criação/edição.
- **Optimistic UI**: Implementado em fluxos críticos para garantir que a interface responda instantaneamente antes mesmo da confirmação do servidor.

---

## 🧪 Camada de Testes

Para garantir a estabilidade durante e após a migração, deve-se seguir esta estratégia de testes:

### 1. Testes Unitários
Focam na lógica isolada e componentes de baixo nível.
- **Onde**: Ao lado do arquivo original ou em pastas `__tests__`.
- **Alvos**:
  - **Atoms e Molecules**: Validar renderização e estados básicos (ex: `Button`, `Input`).
  - **Utils**: Validar funções de formatação e lógica pura.
  - **Services**: Mockar chamadas de API (Axios) para testar o tratamento de dados.
- **Comando**: `npm run test`

### 2. Testes de Integração
Focam na interação entre componentes e gerenciamento de estado.
- **Alvos**:
  - **Features**: Validar fluxos completos (ex: submissão de formulário de login).
  - **Organisms**: Validar componentes complexos que interagem com o estado global (Valtio) ou cache (React Query).
  - **Fluxos de CRUD**: Testar a criação de listas e adição de produtos, garantindo que o cache seja atualizado corretamente.
- **Dica**: Use o MSW (Mock Service Worker) para interceptar requisições de rede durante os testes de integração.

---

## 📦 Guia de Migração

Ao migrar este projeto, siga estas etapas:

1.  **Configuração de Ambiente**:
    - Certifique-se de copiar o arquivo `.env.example` para `.env` e configurar a `NEXT_PUBLIC_API_URL`.
2.  **Instalação de Dependências**:
    - Use `npm install`. Note o uso de `next dev --turbopack` para melhor performance em desenvolvimento.
3.  **Manutenção do Padrão de Pastas**:
    - Se criar uma nova funcionalidade, adicione-a em `src/features/[feature_name]`.
    - Componentes de UI genéricos devem ser colocados em `src/shared/ui` seguindo o Atomic Design.
4.  **Gerenciamento de Estado**:
    - Para estados de interface (ex: modais abertos), use **Valtio**.
    - Para dados que vêm do banco de dados, use **React Query**.
5.  **Testes**:
    - Execute `npm run test` para garantir que as regras de negócio e componentes principais continuam funcionando.

---

> [!TIP]
> O projeto utiliza **Next.js 15**, por isso aproveite as funcionalidades de Server Components sempre que possível, mantendo a camada de Interação em Client Components (`"use client"`).
