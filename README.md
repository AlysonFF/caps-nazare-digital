# CAPS Nazaré Digital

> **Projeto de Extensão Acadêmica**  
> Sistema de gestão integrada para Centros de Atenção Psicossocial (CAPS).

O CAPS Nazaré Digital é uma plataforma full-stack desenvolvida para modernizar o acompanhamento de pacientes, a gestão de oficinas terapêuticas e a manutenção de prontuários digitais em unidades de saúde mental.

---

## Tecnologias Utilizadas

- **Frontend**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes**: [PrimeVue](https://primevue.org/) & [Lucide Icons](https://lucide.dev/)
- **Backend**: Node.js & Express (Clean Architecture)
- **Banco de Dados**: PostgreSQL via [Supabase](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/)

---

## Funcionalidades Principais

- **Dashboard Estratégico**: Visualização em tempo real de estatísticas de pacientes e oficinas do dia.
- **Agenda de Oficinas**: Gestão de atividades coletivas com controle dinâmico de vagas e facilitadores.
- **Cadastro de Pacientes**: Registro completo de usuários com persistência em banco de dados relacional.
- **Prontuário Digital**: Histórico de evoluções médicas e registros clínicos de fácil acesso.
- **Fluxo de Autenticação**: Interface moderna de login com recuperação de senha (mockada para avaliação).

---

## Instruções de Acesso (Avaliação)

Para facilitar o processo de avaliação e permitir acesso livre aos recursos do sistema, o fluxo de login está em Modo de Demonstração:

1.  Acesse a tela de Login.
2.  Insira qualquer e-mail válido (Ex: admin@caps.gov.br).
3.  Insira qualquer senha.
4.  O sistema validará o acesso automaticamente para permitir a navegação completa.

---

## Como Executar Localmente

1.  **Clone o repositório**:
    ```bash
    git clone [url-do-repositorio]
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Configure o Backend**:
    Certifique-se de que o backend do projeto está rodando na porta 3333 para que as requisições do frontend funcionem corretamente.

4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

---

## Estrutura do Projeto

```text
src/
├── assets/         # Recursos visuais e logo
├── components/     # Componentes Vue (Dashboard, Agenda, Prontuário)
├── services/       # Conexão com a API (Axios)
└── App.vue         # Gerenciamento de rotas e estados globais
```

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos e de extensão universitária.

---

<div align="center">
  Desenvolvido para a comunidade de Nazaré da Mata.
</div>
