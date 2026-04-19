# 📋 Backlog de Testes Detalhado - Frontend

Este documento mapeia as lacunas de teste identificadas no relatório de cobertura (`index.html`) e define os fluxos críticos para testes de ponta a ponta (E2E), garantindo a qualidade e confiabilidade da aplicação.

---

## 🧪 Testes Unitários (Jest & React Testing Library)

Foco em zerar os blocos com **0% de cobertura** e aumentar a confiabilidade da lógica de estado.

### 1. Camada de Serviços (Services) - Prioridade: Alta
*   **`src/services/product.ts` (0%):**
    *   Testar chamadas `GET`, `POST`, `PATCH` e `DELETE`.
    *   Validar o envio correto de parâmetros (ex: `listId`, `page`).
    *   Validar tratamento de erro do Axios.
*   **`src/features/shopping-list/api/shopping-list.service.ts` (0%):**
    *   Testar filtragem por `shared`, `category` e `variant`.
    *   Validar a construção da query string.

### 2. Camada de Hooks (Logic) - Prioridade: Alta
*   **`src/hooks/use-create-product.tsx` & `use-delete-product.tsx` (0%):**
    *   Validar se a mutação dispara o `invalidateQueries` corretamente.
    *   Testar callbacks `onSuccess` e `onError`.
*   **`src/features/auth/hooks/use-auth.ts` (0%):**
    *   Validar persistência no `localStorage`.
    *   Testar fluxos de `login`, `register` e `logout` integrados ao estado global.
*   **`src/store/auth.ts` (25%):**
    *   Aumentar cobertura dos `authActions`.
    *   Garantir que o estado `isAuthenticated` reflete corretamente o `user` presente.

### 3. Camada Shared (UI Components) - Prioridade: Média
*   **Componentes de Formulário (0%):** `Input`, `SelectCategory`, `SelectQuantity`, `SearchForm`.
    *   Validar integração com `react-hook-form`.
    *   Testar exibição de estados de erro e interações do usuário.
*   **Primitivos:** `Button`, `Badge`, `Skeleton`.
    *   Garantir cobertura total de variantes (props `variant`, `size`).

---

## 🎭 Testes End-to-End (Playwright)

Foco em validar as principais **User Journeys** e fluxos que cruzam múltiplas camadas.

### Flow 1: Gerenciamento de Listas (Escrita)
*   **Cenário:** O usuário cria uma nova lista, edita seu título e depois a exclui.
*   **Verificação:** A lista deve aparecer no grid imediatamente e ser removida após a exclusão sem necessidade de refresh manual.

### Flow 2: Ciclo de Compras (Interação)
*   **Cenário:** Entrar em uma lista, adicionar 3 produtos diferentes (frutas, limpeza, laticínios), marcar 2 como comprados e excluir o último.
*   **Verificação:** O progresso da lista (barra de progresso) deve atualizar dinamicamente.

### Flow 3: Descoberta e Filtros (Navegação)
*   **Cenário:** Acessar a página de "Listas Compartilhadas", filtrar pela categoria "Feira" e realizar uma busca por texto.
*   **Verificação:** A URL deve refletir os filtros e o grid deve mostrar apenas os itens correspondentes.

### Flow 4: Persistência e Proteção de Rotas (Segurança)
*   **Cenário:** Tentar acessar `/shopping-list` sem estar logado; Fazer login e dar refresh na página.
*   **Verificação:** Deve haver redirecionamento para `/login` quando deslogado e a sessão deve persistir após o refresh.

### Flow 5: Responsividade e Acessibilidade (UX)
*   **Cenário:** Abrir a aplicação em modo mobile, usar o menu lateral (Sidebar) e adicionar um produto.
*   **Verificação:** O menu deve fechar após a navegação e o formulário de produto deve ser utilizável em telas pequenas.

---

## 📈 Metas de Cobertura
*   **Global Statements**: > 80% (Meta final).
*   **Critical Features (Auth/Shopping-List)**: 100% de cobertura de lógica.
*   **E2E Coverage**: Cobrir 100% dos fluxos de "Caminho Feliz" (Happy Path).

---
**Data da Revisão**: 2026-04-19
**Status**: Planejado
