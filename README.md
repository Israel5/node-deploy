# Recuperar senha

**RF - Requisitos Funcionais**
- O usuário deve poder recuperar sua senha informando o e-mail;
- O usuário deve receber o email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF - Requisitos Não Funcionais**
- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano;

**RN - Regras de negócio**
- O link enviado para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha;

# Atualização de perfil

**RF - Requisitos Funcionais**
- O usuário deve poder atualizar seu nome, e-mail e senha;

**RNF - Requisitos Não Funcionais**

**RN - Regras de negócio**
- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF - Requisitos Funcionais**
- O usuário deve poder listar seu agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um agendamento;
- O prestador deve poder visualizar as notificações não lidas;


**RNF - Requisitos Não Funcionais**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificaçoes do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN - Regras de negócio**
- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF - Requisitos Funcionais**
- O usuário deve poder listar todos os prestadores cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF - Requisitos Não Funcionais**
- A listagem de prestadores deve ser armazenada em cache;

**RN - Regras de negócio**
- Cada agendamento deve durar exatamente 1h;
- Os agendamentos devem estar disponíveis entre às 8h e às 18h (o primeiro ás 8h e o último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar servisço consigo mesmo;
