### Requisitos página de Alertas

### Backlog

- Deve iniciar a pagina com os valores corretos;
- Deve exibir o painel de erro caso a busca de alertas retorne com erro;
- Deve ser possível adicionar uma mensagem para exibir na tela home do app do cliente;
- Deve ser possível adicionar uma mensagem para exibir na tela de serviços do app do cliente;
- Deve ser possível adicionar uma mensagem para exibir na tela de histórico do app do cliente;
- Quando não existir mensagem configurada deve exibir mensagem padrão;
- Quando existir mensagem configurada, porém com status oculta deve destacar o status no painel;

### Requisitos Criação de novo Aviso
- Deve iniciar o formulario para configurar o aviso com os valores corretos;
  * Deve ser possível informar o status do aviso;
  * Deve ser possível informar a mensagem do aviso;
  * Deve ser possível remover um aviso configurado;
  * Não deve ser possível cadastrar aviso com menos de 4 caracteres;
  * Deve exibir erro no helper do input mensagem do aviso caso ocorram erros com o aviso;
  * Quando fechada a tela de cadastro os dados do formulário devem ser resetados;
  * Ao configurar um novo aviso com sucesso o mesmo deve ser adicionado no seu painel;
- No primeiro acesso a tela a consulta de aisos deve ser chamada apenas uma vez;


