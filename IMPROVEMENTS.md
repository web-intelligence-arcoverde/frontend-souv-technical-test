# 🎨 Sugestões de Melhoria - Frontend

Este documento detalha as oportunidades de melhoria identificadas no frontend para elevar a qualidade do código, a experiência do usuário (UX) e a manutenibilidade.

## 1. 🏗️ Organização de Componentes e Arquitetura

### Consolidação de UI
Atualmente, existem componentes em `src/components/ui` (padrão Shadcn) e em `src/shared/ui` (Atoms, Molecules, Organisms).
- **Recomendação:** Padronizar onde cada tipo de componente deve residir. Sugiro usar `src/components/ui` para componentes base (primitivos) e `src/shared/ui` para componentes que compõem a lógica de negócio ou seguem o Atomic Design.

### Gerenciamento de Estado de Autenticação
Com a chegada do Firebase, será necessário um Contexto Global (`AuthContext`) para gerenciar o estado do usuário (logado/deslogado) e disponibilizar os dados do usuário para toda a aplicação.

---

## 2. 🚦 Roteamento e Segurança

### Proteção de Rotas
Implementar um mecanismo de **Rotas Privadas** para impedir que usuários não autenticados acessem as listas de compras.
- **Sugestão:** Usar um componente `ProtectedRoute` que envolve as páginas protegidas ou um Middleware do Next.js para redirecionamento no lado do servidor.

---

## 🛠️ 3. Integração com API e Tratamento de Erros

### Feedback ao Usuário (Toasts)
O projeto já possui `@radix-ui/react-toast` nas dependências.
- **Melhoria:** Implementar notificações visuais (sucesso/erro) em todas as operações de CRUD (criar, deletar, marcar como concluído).

### Estados de Loading
Utilizar o componente `loading.tsx` de forma mais abrangente nos hooks do React Query para evitar "saltos" de layout enquanto os dados são carregados.

---

## 📱 4. UX e Design System

### Uso de `next/image`
Garantir que todas as imagens utilizem o componente `<Image />` do Next.js com as propriedades de `priority` adequadas para melhorar o LCP (Largest Contentful Paint), especialmente no Header.

### Tematização (Dark/Light Mode)
Aproveitar o Tailwind CSS para implementar um suporte nativo a temas, garantindo acessibilidade e conforto visual.

---

## ⚙️ 5. Qualidade de Código (DX)

### Husky e Lint-staged
Assim como no backend, configurar hooks de git para garantir que o código seja formatado e testado antes de cada commit.

### Testes Unitários
Aproveitar que o **Jest** já está configurado para adicionar testes nos componentes de Atoms e Molecules, garantindo que mudanças visuais não quebrem funcionalidades básicas.
