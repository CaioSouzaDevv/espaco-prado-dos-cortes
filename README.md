# BarberApp - Sistema de Gestão de Barbearia

Um aplicativo simples para controle interno de barbearias, focado no dono/barbeiro gerenciar clientes, serviços e agendamentos.

---

## 🛠 Funcionalidades Essenciais

### Agendamento de Clientes
- Criar, editar e cancelar agendamentos.
- Visualização por dia, semana ou mês.

### Controle de Clientes
- Cadastro de clientes: nome, telefone e histórico de cortes/serviços.

### Gerenciamento de Serviços
- Adicionar, editar e remover serviços (corte, barba, etc.) e preços.

### Visualização de Agenda
- Calendário mostrando horários ocupados e livres.

### Relatórios Simples
- Receita diária, semanal e mensal.
- Serviços mais realizados.

### Notas Rápidas
- Observações sobre clientes ou horários.

---

## ✨ Funcionalidades Extras Opcionais
- Exportar dados: CSV ou PDF com agendamentos ou relatórios.
- Alertas internos: lembretes de horários do dia.
- Pesquisa rápida: buscar cliente pelo nome ou telefone.
- Tema simples: Light/Dark mode para melhor visualização.

---

## 📱 Estrutura do App (Telas)

### Tela Principal (Dashboard)
- Visão geral da agenda do dia.
- Botão “Novo Agendamento”.

### Tela de Agendamentos
- Lista ou calendário de agendamentos.
- Opções de Editar / Cancelar.

### Tela de Clientes
- Lista de clientes.
- Histórico de serviços realizados.

### Tela de Serviços
- Adicionar, editar e remover serviços.

### Tela de Relatórios
- Receita e estatísticas.

### Tela de Configurações (Opcional)
- Tema, backup/exportação de dados.

---

## ⚙️ Complexidade do Projeto

### Frontend: Fácil-Médio
- Pode ser um app web responsivo ou híbrido (Ionic, React Native).
- Calendário/agenda pode usar bibliotecas prontas.

### Backend: Fácil-Médio
- CRUD simples para clientes, serviços e agendamentos.
- Banco de dados local (SQLite) ou online (Firebase, Supabase) é suficiente.
- Autenticação complexa não é necessária se for só para uso interno.

### Banco de Dados: Fácil
- Estrutura simples: clientes, serviços, agendamentos.

---

## 💡 Resumo
Um app interno é bem mais simples que um sistema público. Com organização das telas e do banco de dados, é possível criar algo funcional em poucas semanas.

---

## 📝 Tecnologias Sugeridas
- **Frontend:** Angular, React, Ionic ou Vue.js.
- **Backend:** Node.js, Firebase ou Supabase.
- **Banco de Dados:** SQLite (local) ou Firestore (online).
- **Bibliotecas úteis:** FullCalendar, Bootstrap, Moment.js.
