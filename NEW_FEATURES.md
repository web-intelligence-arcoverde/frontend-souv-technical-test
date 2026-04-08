# 🚀 Novas Funcionalidades - Frontend

Este documento descreve as novas interfaces e fluxos que serão implementados para suportar o ecossistema de usuários e múltiplas listas de compras.

---

## 1. 🔑 Tela de Login e Cadastro

Uma interface moderna para autenticação, integrada diretamente com o Firebase Auth.

### Funcionalidades:
- **Login:** Campos de e-mail e senha com validação em tempo real via Zod.
- **Cadastro:** Criação de novos usuários.
- **Integração Social:** Botão "Entrar com Google" (opcional).
- **Esqueci minha senha:** Fluxo de recuperação de e-mail.

---

## 🚦 2. Rotas Privadas

Implementação de uma camada de segurança no roteamento do Next.js.

### Como funciona:
- Ao acessar qualquer rota (exceto `/login`), o app verifica se existe um usuário autenticado.
- Caso não esteja logado, o usuário é redirecionado para `/login`.
- Uso do `Suspense` para mostrar um carregamento enquanto o Firebase valida o estado da sessão.

---

## 📋 3. Tela: Minhas Listas de Compras

Uma nova página (Dashboard) que servirá como ponto central para o usuário.

### Elementos da Tela:
- **Grid/Lista:** Visualização de todas as listas de compras criadas pelo usuário (Ex: "Churrasco", "Compras do Mês", "Festa").
- **Resumo:** Exibição de quantos itens cada lista possui e quantos já foram marcados como concluídos.
- **Ação:** Botão de destaque para criar uma nova lista.

---

## ➕ 4. CRUD de Listas de Compras

Interface para gerenciar os metadados das listas.

### Funcionalidades:
- **Criar Lista:** Modal ou página simples para definir nome, cor da etiqueta (tag) e ícone representativo.
- **Editar Lista:** Alterar o nome ou excluir a lista inteira.
- **Deleção com Confirmação:** Modal de segurança para evitar exclusões acidentais.

---

## 🔄 Fluxo de Navegação Sugerido

1.  **Usuário abre o app** -> Redirecionado para `/login`.
2.  **Usuário faz login** -> Vai para `/dashboard` (Minhas Listas).
3.  **Usuário clica em uma lista** -> Vai para `/lists/[id]` (onde verá os produtos daquela lista - tela atual refatorada).
4.  **Usuário clica em "Nova Lista"** -> Abre formulário de criação.

---

## 🎨 Visual e Identidade
As novas telas seguirão o padrão estético atual com **Tailwind CSS** e componentes **Shadcn UI**, garantindo uma transição fluida entre a gestão de listas e a gestão de produtos.
