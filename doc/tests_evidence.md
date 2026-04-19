# Evidências de Testes - Frontend Shopping List

Este documento consolida as evidências de execução dos testes unitários e de cobertura para a aplicação frontend.

---

## 🧪 Testes Unitários (Jest)

Os testes unitários validam os principais componentes de autenticação e fluxos de navegação das páginas de login e registro.

### Sumário de Execução
```text
PASS src/views/login/ui/login-page.spec.tsx
PASS src/views/register/ui/register-page.spec.tsx
PASS src/features/auth/components/login-form.spec.tsx

Test Suites: 3 passed, 3 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        2.377 s
Ran all test suites.
```

---

## 📊 Cobertura de Código

Atualmente, o projeto foca na cobertura das funcionalidades críticas de autenticação (Auth Feature). Outros módulos estão em fase de migração e implementação de testes.

### Métricas Atuais (Resumo)
| Categoria | Percentual |
| :--- | :--- |
| **Statements** | 6.07% |
| **Branches** | 5.39% |
| **Functions** | 2.97% |
| **Lines** | 6.13% |

### Destaques de Cobertura
- **Auth View (Login/Register)**: 100% de cobertura nos componentes de página.
- **Shared Components (Button/Input)**: Cobertura parcial em componentes fundamentais.

---

## 🛠️ Ambiente de Testes
- **Framework**: Jest + React Testing Library.
- **Vite/Next.js Compatibility**: Configurado para trabalhar com Next.js 15.
- **Mocking**: Utiliza mocks para serviços de API e roteamento do Next.js.

**Data da Execução**: 2026-04-19
**Ambiente**: Desenvolvimento Local
